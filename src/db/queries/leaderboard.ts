/* eslint-disable @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-argument */

import { sql } from "kysely";
import { db } from "..";
import { cache } from "../../cache";
import crypto from "node:crypto";
import {
  type FetchLeaderboardInput,
  type LeaderboardResponse,
} from "./leaderboard.types";

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

export async function fetchLeaderboardRaw(
  opts: FetchLeaderboardInput
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

  console.log(
    `Querying leaderboard for guild ${guildId} with options:`,
    options
  );

  // create the default query
  let builder = db
    .selectFrom("mmr_rating")
    .where("mmr_rating.guild_id", "=", guildId)
    // Filter for the latest mmr rating per user
    .where(
      "mmr_rating.time",
      "=",
      (qb) =>
        qb
          .selectFrom("mmr_rating as latest_mmr")
          .select(sql<number>`MAX(${sql.ref('latest_mmr.time')})`.as("max_time"))
          .whereRef("latest_mmr.user_id", "=", "mmr_rating.user_id")
          .where("latest_mmr.guild_id", "=", guildId)
          .where((eb) =>
            eb.or([
              eb("latest_mmr.queue_channel_id", "=", 0),
              eb(
                "latest_mmr.queue_channel_id",
                "in",
                qb
                  .selectFrom("queuechannels")
                  .select("queuechannels.channel_id")
                  .where("queuechannels.guild_id", "=", guildId)
                  .where("queuechannels.unique_leaderboard", "=", false)
              ),
            ])
          )
    )
    // Join with summed points for global leaderboard (non-unique queues)
    .leftJoin(
      (qb) =>
        qb
          .selectFrom("points")
          .select([
            "points.user_id",
            sql<number>`SUM(${sql.ref('points.wins')})`.as("total_wins"),
            sql<number>`SUM(${sql.ref('points.losses')})`.as("total_losses"),
          ])
          .where("points.guild_id", "=", guildId)
          .where((eb) =>
            eb.or([
              eb("points.queue_channel_id", "=", 0),
              eb(
                "points.queue_channel_id",
                "in",
                qb
                  .selectFrom("queuechannels")
                  .select("queuechannels.channel_id")
                  .where("queuechannels.guild_id", "=", guildId)
                  .where("queuechannels.unique_leaderboard", "=", false)
              ),
            ])
          )
          .groupBy("points.user_id")
          .as("merged_points"),
      // @ts-expect-error Error with Kysely type inference, safe in runtime context
      "merged_points.user_id",
      "mmr_rating.user_id"
    )
    // Join with igns table
    // @ts-expect-error Error with Kysely type inference, safe in runtime context
    .leftJoin("igns", (eb) =>
      // @ts-expect-error Error with Kysely type inference, safe in runtime context
      eb.on((b) =>
        b.and([
          b(b.ref("igns.user_id"), "=", b.ref("mmr_rating.user_id")),
          b(b.ref("igns.guild_id"), "=", b.ref("mmr_rating.guild_id")),
        ])
      )
    )
    // Calculate winrate and mmr
    .select([
      // (total_wins + 0.0) / (GREATEST(total_wins + total_losses, 1.0) + 0.0)
      // @ts-expect-error Error with Kysely type inference, safe in runtime context
      (eb) =>
        sql<string>`(${eb.ref("merged_points.total_wins")} + 0.0) / (GREATEST(${eb.ref(
          "merged_points.total_wins"
        )} + ${eb.ref("merged_points.total_losses")}, 1.0) + 0.0)`.as("winrate"),
      // (mu - 2 * sigma) * 100
      // @ts-expect-error Error with Kysely type inference, safe in runtime context
      (eb) =>
        sql<string>`(${eb.ref("mmr_rating.mu")} - 2 * ${eb.ref(
          "mmr_rating.sigma"
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

  // Search filter
  const searchFor = options.searchFor;
  if (searchFor !== undefined) {
    try {
      // try to parse as bigint
      const id = BigInt(searchFor);

      // if successful, it could be an ID
      builder = builder
        // @ts-expect-error Error with Kysely type inference, safe in runtime context
        .where((eb) =>
          eb.or([
            // Kysely says it doesn't support bigint, but it does
            eb(eb.ref("mmr_rating.user_id"), "=", id as unknown as number),
            eb(eb.ref("igns.ign"), "like", `%${searchFor}%`),
          ])
        );
    } catch (error) {
      builder = builder
        // The following line only works if igns.ign is FULLTEXT indexed
        // .where(eb => sql`MATCH(${eb.ref("igns.ign")}) against(${searchFor})`)
        // so for now, we just do a LIKE search
        // @ts-expect-error Error with Kysely type inference, safe in runtime context
        .where((eb) => sql`${eb.ref("igns.ign")} LIKE ${`%${searchFor}%`}`);
    }
  }

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
    `Querying leaderboard for guild ${guildId} took ${Date.now() - startTime}ms`
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
    // don't cache searches
    if (params.searchFor) return false;

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
