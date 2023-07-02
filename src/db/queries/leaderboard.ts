import { sql } from "kysely";
import { db } from "..";
import { cache } from "../../cache";
import crypto from "node:crypto";
import { type FetchLeaderboardInput, type LeaderboardResponse } from "./leaderboard.types";
import { isDefined } from "../../utils";

// patch json seralization with bigints
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(BigInt.prototype as any).toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return this.toString();
};



const orderByMap = {
  wins: 'points.wins',
  losses: 'points.losses',
  mmr: "mmr",
  winrate: "winrate"
} as const;

export async function fetchLeaderboardRaw(opts: FetchLeaderboardInput): Promise<LeaderboardResponse> {
  // default options
  const options = {
    sortBy: 'wins',
    sortDirection: 'desc',
    limit: 10,
    offset: 0,
    includeTop3: true,
    ...opts,
  } as const;

  const guildId = options.guild_id as unknown as number;

  // create the default query
  const builder = db.selectFrom("mmr_rating")
    .where("mmr_rating.guild_id", "=", guildId)
    // join with mmr_rating, same user_id and guild_id
    .leftJoin("points", "points.user_id", "mmr_rating.user_id")
    .where("points.guild_id", "=", guildId)
    // join with igns, same user_id and guild_id
    .leftJoin("igns", "igns.user_id", "mmr_rating.user_id")
    .where("igns.guild_id", "=", guildId)
    // calculate winrate and mmr
    .select([
      // (wins + 0.0) / (GREATEST(wins + losses, 1.0) + 0.0)
      (eb) => sql<string>`(${eb.ref("points.wins")} + 0.0) / (GREATEST(${eb.ref("points.wins")} + ${eb.ref("points.losses")}, 1.0) + 0.0)`.as("winrate"),
      // (mu - 2 * sigma) * 100
      (eb) => sql<string>`(${eb.ref("mmr_rating.mu")} - 2 * ${eb.ref("mmr_rating.sigma")}) * 100`.as("mmr")
    ])
    // add in sortBy and sortDirection
    .orderBy(
      orderByMap[options.sortBy ?? 'wins'],
      options.sortDirection
    )
    // select the other fields we need
    .select([
      "igns.ign",
      "mmr_rating.user_id",
      "points.wins",
      "points.losses",
      // db.fn.count("mmr_rating.user_id").distinct().as("total")
    ]);

  // grab the requested data
  const requestedData = builder
    .limit(options.limit)
    .offset(options.offset);

  // count total pages
  const pages = options.withPageCount
    ? builder
      .clearSelect()
      .clearOffset()
      .clearLimit()
      .clearOrderBy()
      .select([
        db.fn.count("mmr_rating.user_id").distinct().as("total")
      ])
    : undefined;

  // // execute the queries
  const [data, totalEntries] = await Promise.all([
    requestedData.execute(),
    pages?.execute()
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

  return {
    data: data.map((row) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ign: row.ign ?? row.user_id!.toString(),
      wins: row.wins,
      losses: row.losses,
      mmr: parseFloat(row.mmr),
      winrate: parseFloat(row.winrate) * 100
    })),
    total: totalEntriesParsed,
    fetched: Date.now()
  }
}

export const fetchLeaderboard = cache(fetchLeaderboardRaw, {
  cacheKey: (params) => {
    // hash the params so we get a unique id for the given options
    const hash = crypto.createHash("sha1").update(JSON.stringify(params)).digest("base64");
    return `leaderboard:${hash}`;
  },
  staleTime: /* 30 Seconds */ 30,
  expireTime: /* 1 Hour */ 60 * 60
});