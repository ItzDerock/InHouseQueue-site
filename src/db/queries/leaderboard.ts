/* eslint-disable @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-argument */

import { NotNull, sql } from "kysely";
import { db } from "..";
import { cache } from "../../cache";
import crypto from "node:crypto";
import {
  FetchLeaderboardSortType,
  type FetchLeaderboardInput,
  type LeaderboardResponse,
} from "./leaderboard.types";
import { DBGame } from "../enums";

// patch json serialization with bigints
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(BigInt.prototype as any).toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return this.toString();
};

const orderByMap = {
  wins: "merged_points.total_wins",
  losses: "merged_points.total_losses",
  mmr: "mmr",
  winrate: "winrate",
} as const;

interface LeaderboardResult {
  ign: string | null;
  user_id: string;
  wins: number;
  losses: number;
  mmr: number;
  winrate: number;
}

/**
 * Fetches a guild's leaderboard, retrieving all the unique game and queue channel id options
 */
export const fetchLeaderboardOptions = cache(
  async (guildId: string | bigint) => {
    // cannot safely store guild id's as a number because might be bigger than Number.MAX_SAFE_INTEGER
    // but the database is stored as a number, so type cast.
    const guildIdNumber = BigInt(guildId) as unknown as number;

    const channelsQuery = db
      .selectFrom("queuechannels")
      .select(["channel_id", "unique_leaderboard"])
      .where((expr) =>
        expr.and([
          expr("queuechannels.guild_id", "=", guildIdNumber),
          expr("queuechannels.unique_leaderboard", "=", true),
          expr("queuechannels.channel_id", "is not", null),
        ]),
      )
      .orderBy("channel_id") // so deterministic
      .$narrowType<{ channel_id: NotNull }>();

    const gamesQuery = db
      .selectFrom("points")
      .select("game")
      .where((expr) =>
        expr.and([
          expr("guild_id", "=", guildIdNumber),
          expr("game", "is not", null),
        ]),
      )
      .$narrowType<{ game: NotNull }>()
      .distinct();

    // run queries simultaneously
    const [channels, games] = await Promise.all([
      channelsQuery.execute(),
      gamesQuery.execute(),
    ]);

    return {
      channels,
      games,
    };
  },
  {
    cacheKey: (guildId) => `leaderboardOptions:${guildId}`,
    staleTime: /* 30 Seconds */ 30,
    expireTime: /* 2 minutes */ 120,
  },
);

export async function fetchLeaderboardRaw(
  opts: FetchLeaderboardInput,
): Promise<LeaderboardResponse> {
  // default options
  const options = {
    sortBy: "wins",
    sortDirection: "desc",
    limit: 10,
    offset: 0,
    includeTop3: true,
    ...opts,
  } as const;

  const guildId = options.guild_id as unknown as number;
  const orderBy = orderByMap[options.sortBy ?? "wins"];
  const game = options.filters?.game ?? DBGame.LeagueOfLegends;

  const queueChannelId =
    options.filters?.queueId !== "global" && options.filters?.queueId
      ? (BigInt(options.filters?.queueId) as unknown as number)
      : undefined;

  console.log(
    `Querying leaderboard for guild ${guildId} with options:`,
    options,
  );

  // Check if the channel has a unique leaderboard (if channel ID is provided)
  let isUniqueLeaderboard = false;
  if (queueChannelId) {
    const uniqueCheck = await db
      .selectFrom("queuechannels")
      .select("unique_leaderboard")
      .where("guild_id", "=", guildId)
      .where("channel_id", "=", BigInt(queueChannelId) as unknown as number)
      .executeTakeFirst();

    isUniqueLeaderboard = uniqueCheck?.unique_leaderboard === true;
  }

  console.log(isUniqueLeaderboard)

  // Start building the query
  let builder = db
    .selectFrom("mmr_rating")
    .where("mmr_rating.guild_id", "=", guildId)
    // Filter for the latest mmr rating per user
    .where("mmr_rating.time", "=", (qb) =>
      qb
        .selectFrom("mmr_rating as latest_mmr")
        .select((eb) => eb.fn.max("latest_mmr.time").as("max_time"))
        .whereRef("latest_mmr.user_id", "=", "mmr_rating.user_id")
        .where((eb) =>
          eb.and([
            eb("latest_mmr.guild_id", "=", guildId),
            eb("latest_mmr.game", "=", game),

            // if unique leaderboard, filter by queue channel id
            isUniqueLeaderboard && queueChannelId
              ? eb("latest_mmr.queue_channel_id", "=", queueChannelId)
              : eb.or([
                eb("latest_mmr.queue_channel_id", "=", 0),
                eb(
                  "latest_mmr.queue_channel_id",
                  "in",
                  qb
                    .selectFrom("queuechannels")
                    .select("queuechannels.channel_id")
                    .where("queuechannels.guild_id", "=", guildId)
                    .where("queuechannels.unique_leaderboard", "=", false),
                ),
              ]),
          ]),
        ),
    )
    // Join with summed points for global leaderboard (non-unique queues)
    .leftJoin(
      (qb) =>
        qb
          .selectFrom("points")
          .select([
            "points.user_id",
            sql<number>`SUM(${sql.ref("points.wins")})`.as("total_wins"),
            sql<number>`SUM(${sql.ref("points.losses")})`.as("total_losses"),
          ])
          .where("points.guild_id", "=", guildId)
          .where((eb) =>
            isUniqueLeaderboard && queueChannelId
              ? eb("points.queue_channel_id", "=", queueChannelId)
              : eb.or([
                eb("points.queue_channel_id", "=", 0),
                eb(
                  "points.queue_channel_id",
                  "in",
                  qb
                    .selectFrom("queuechannels")
                    .select("queuechannels.channel_id")
                    .where("queuechannels.guild_id", "=", guildId)
                    .where("queuechannels.unique_leaderboard", "=", false),
                ),
              ]),
          )
          .groupBy("points.user_id")
          .as("merged_points"),
      (join) => join.onRef("merged_points.user_id", "=", "mmr_rating.user_id"),
    )
    // Join with igns table
    .leftJoin("igns", (join) =>
      join
        .onRef("igns.user_id", "=", "mmr_rating.user_id")
        .onRef("igns.guild_id", "=", "mmr_rating.guild_id"),
    )
    // Calculate winrate and mmr
    .select((eb) => [
      // (total_wins + 0.0) / (GREATEST(total_wins + total_losses, 1.0) + 0.0)
      sql<string>`(${eb.ref("merged_points.total_wins")} + 0.0) / (GREATEST(${eb.ref(
        "merged_points.total_wins",
      )} + ${eb.ref("merged_points.total_losses")}, 1.0) + 0.0)`.as("winrate"),
      // (mu - 2 * sigma) * 100
      sql<string>`(${eb.ref("mmr_rating.mu")} - 2 * ${eb.ref(
        "mmr_rating.sigma",
      )}) * 100`.as("mmr"),
    ])
    // Add in sortBy and sortDirection
    .orderBy(orderBy, options.sortDirection)
    // Select the other fields we need
    .select([
      "igns.ign",
      "mmr_rating.user_id",
      "merged_points.total_wins as wins",
      "merged_points.total_losses as losses",

      // Maybe someone smarter can figure out how to get the position
      // the ROW_NUMBER approach does not seem to give correct numbers
      // sql<string>`ROW_NUMBER() OVER(ORDER BY ${eb.ref("points.wins")} DESC)`.as("position")
      // And the SELECT COUNT(*) WHERE (order by column) < (order by column) AS position
      // does not work because I would need to recalculate winrate/mmr
      // and that seems pretty expensive on the db, also kysely doesn't register the right types when I do that.
      // eb
      //   .selectFrom("mmr_rating")
      //   .select(db.fn.countAll().as("position"))
      //   .where(orderBy, "<", orderBy)
      //   .as("position")
    ]);

  // grab the requested data
  const requestedData = builder.limit(options.limit).offset(options.offset);

  // count total pages
  const pages = options.withPageCount
    ? builder
      .clearSelect()
      .clearOffset()
      .clearLimit()
      .clearOrderBy()
      .select([db.fn.count("mmr_rating.user_id").distinct().as("total")])
    : undefined;

  // execute the queries
  const startTime = Date.now();
  const [data, totalEntries] = await Promise.all([
    requestedData.execute(),
    pages?.execute(),
  ]);

  console.log(data); // TODO: Remove after dev

  // get the total pages
  let totalEntriesParsed: number | bigint = 0;
  if (totalEntries) {
    const element = totalEntries[0];
    if (element) {
      if (typeof element.total === "string") {
        totalEntriesParsed = parseInt(element.total);
      } else {
        totalEntriesParsed = element.total;
      }
    }
  }

  console.log(
    `Querying leaderboard for guild ${guildId} took ${Date.now() - startTime}ms`,
  );

  return {
    data: data.map((row: LeaderboardResult) => ({
      ign: row.ign ?? row.user_id,
      user_id: row.user_id,
      wins: row.wins,
      losses: row.losses,
      mmr: row.mmr,
      winrate: row.winrate * 100,
    })),
    total: totalEntriesParsed,
    fetched: Date.now(),
  };
}

export const fetchLeaderboard = cache(fetchLeaderboardRaw, {
  cacheKey: (params) => {
    return false; // TODO: REMOVE AFTER DEV

    // don't cache searches
    if (params.filters?.searchTerm) return false;

    // hash the params so we get a unique id for the given options
    const hash = crypto
      .createHash("sha1")
      .update(JSON.stringify(params))
      .digest("base64");
    return `leaderboard:${hash}`;
  },
  staleTime: /* 30 Seconds */ 30,
  expireTime: /* 1 Hour */ 60 * 60,
});
