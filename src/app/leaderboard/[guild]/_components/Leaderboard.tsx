"use client";

import useSWRInfinite from "swr/infinite";
import useLeaderboardStore from "./State";
import { useMemo } from "react";
import type { LeaderboardResponse } from "@/db/queries/leaderboard.types";
import { LeaderboardTable, LeaderboardTableEntries } from "./Table";
import { SortDirection } from "@/components/SortIcon";

export function Leaderboard(props: {
  guildId: string;
  initialData: LeaderboardResponse;
}) {
  const state = useLeaderboardStore();
  const queryParams = useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("sortBy", state.sortBy);
    searchParams.set(
      "sortDirection",
      state.sortDir === SortDirection.None ? SortDirection.Desc : state.sortDir,
    );
    searchParams.set("searchFor", state.searchFor ?? "");
    searchParams.set("game", state.game);
    searchParams.set("leaderboard", state.leaderboard);
    return searchParams;
  }, [state]);

  const { data, isLoading, mutate, error } = useSWRInfinite<
    LeaderboardResponse,
    unknown
  >(
    (pageIndex, previous) => {
      console.log(pageIndex, previous);
      // if ((previous?.data.length ?? 100) < 10) return null;
      return `/api/leaderboard/${props.guildId}?${queryParams.toString()}&page=${pageIndex}`;
    },
    {
      // fallbackData: [props.initialData],
      fetcher: async (...args: Parameters<typeof fetch>) => {
        (args[1] ??= {}).credentials = "include";
        return fetch(...args).then((res) => res.json());
      },
    },
  );

  console.log(data, isLoading);

  const lastElement = useMemo(() => data?.at(-1), [data]);
  const isMore = useMemo(() => (data?.at(-1)?.data.length ?? 0) <= 10, [data]);

  return (
    <LeaderboardTable
      error={error ? String(error) : undefined}
      total={lastElement?.total ?? 0}
      loadMore={mutate}
      isLoading={isLoading}
      isMore={isMore}
      entries={data ?? []}
      guildId={props.guildId}
      fetched={lastElement?.fetched ?? Date.now()}
    >
      <LeaderboardTableEntries entries={data ?? []} />
    </LeaderboardTable>
  );
}
