import React from "react";

import StatCard from "../../components/StatCard/StatCard";
import { env } from "../../env.mjs";
import z from "zod";

const StatsSchema = z.object({
  active_players: z.coerce.number().int(),
  matches_played: z.coerce.number().int(),
  servers: z.coerce.number().int(),
});

/**
 * Fetches the bot statistics from the API, revalidating every hour.
 * - If the request fails, it will return null.
 * - The request will have a timeout of 5 seconds.
 * - Can be forcefully revalidated by invalidating the "stats" tag.
 *
 * @returns the bot statistics
 */
async function fetchStatistics() {
  try {
    return await fetch(env.STATS_ENDPOINT, {
      next: {
        revalidate: 3600, /* revalidate every hour */
        tags: ["stats"],
      },
      signal: AbortSignal.timeout(5_000),
    })
      .then((res) => res.json())
      .then(data => StatsSchema.parse(data));
  } catch (err) {
    console.error("Failed to fetch statistics: ", err);
    return null;
  } finally {
  console.log("Fetched statistics");
  }
}

export default async function StatCards() {
  const data = await fetchStatistics();

  return (
    <div className="relative z-30 mb-8 w-full">
      <div className="z-30 flex w-full flex-row flex-wrap justify-center gap-9 align-middle md:-translate-y-24">
        <StatCard
          count={data?.servers ?? 2000}
          label="Servers"
          aosIndex={0}
        />
        <StatCard
          count={data?.active_players ?? 24000}
          label="Active Players"
          aosIndex={1}
        />
        <StatCard
          count={data?.matches_played ?? 50000}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  );
}
