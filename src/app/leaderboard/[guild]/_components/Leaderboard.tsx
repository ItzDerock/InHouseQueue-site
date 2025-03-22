"use client";

import useSWRInfinite from "swr/infinite";
import useLeaderboardStore from "./State";
import { useEffect, useMemo, useState } from "react";
import {
  LeaderboardEntry,
  type LeaderboardMetadata,
  type LeaderboardResponse,
} from "@/db/queries/leaderboard.types";
import { LeaderboardTable, LeaderboardTableEntries } from "./Table";
import { LeaderboardCards } from "./Cards";
import { LeaderboardFilters } from "./Filters";
import { LeaderboardSearch } from "./Search";
import type { DBGame } from "@/db/enums";
import { buildLeaderboardQueryParams } from "./LeaderboardUtils";

export function Leaderboard(props: {
  guildId: string;
  initialData: {
    data: LeaderboardResponse;
    optionsHash: string;
  };
  meta: LeaderboardMetadata;
}) {
  const state = useLeaderboardStore();

  /**
   * If the game is not in the list of games, set it to the first game in the list
   */
  useEffect(() => {
    if (
      !props.meta.games.map((game) => game.game).includes(state.game) &&
      props.meta.games.length > 0 &&
      state.game !== "all"
    ) {
      state.setGame(props.meta.games[0]!.game as DBGame);
    }
  }, [props.meta, state]);

  /**
   * The query parameters used for the API request
   */
  const [queryParams, useInitial] = useMemo(() => {
    const query = buildLeaderboardQueryParams(state);

    // check against initial data
    // if the options hash is the same, use the initial data
    // otherwise, force a query
    const useInitial = props.initialData.optionsHash === query.toString();

    return [query, useInitial];
  }, [state, props.initialData]);

  const { data, isLoading, error, setSize } = useSWRInfinite<
    LeaderboardResponse,
    unknown
  >(
    (pageIndex, previous: LeaderboardResponse) => {
      // only load more if there is more data available
      if (previous && previous.data.length < 10 && previous.total < 10) {
        return null;
      }

      return `/api/leaderboard/${props.guildId}?${queryParams.toString()}&page=${pageIndex}`;
    },
    {
      fallbackData: useInitial ? [props.initialData.data] : undefined,
      fetcher: async (...args: Parameters<typeof fetch>) => {
        (args[1] ??= {}).credentials = "include";
        return fetch(...args).then((res) => res.json());
      },
    },
  );

  // update top3 when data changes only if no search is active
  const [top3, setTop3] = useState<LeaderboardEntry[]>(
    props.initialData.data.data.slice(0, 3),
  );

  useEffect(() => {
    if (data && state.searchFor?.trim() !== "") {
      setTop3(data[0]?.data.slice(0, 3) ?? []);
    }
  }, [data, state.searchFor]);

  const lastElement = useMemo(() => data?.at(-1), [data]);
  const isMore = useMemo(() => (data?.at(-1)?.data.length ?? 0) <= 10, [data]);

  return (
    <>
      {/* cards */}
      <div className="relative">
        {top3 && top3.length > 0 && <LeaderboardCards entries={top3} />}
      </div>

      <div className="mx-auto max-w-screen-lg">
        <LeaderboardSearch />
        <LeaderboardFilters meta={props.meta} />

        {/* table */}
        <LeaderboardTable
          error={error ? String(error) : undefined}
          total={lastElement?.total ?? 0}
          loadMore={() => setSize((size) => size + 1)}
          isLoading={isLoading}
          isMore={isMore}
          entries={data ?? []}
          guildId={props.guildId}
          fetched={lastElement?.fetched ?? Date.now()}
        >
          <LeaderboardTableEntries entries={data ?? []} />
        </LeaderboardTable>
      </div>
    </>
  );
}
