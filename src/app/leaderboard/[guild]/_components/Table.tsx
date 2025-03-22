"use client";

import Button from "@/components/Button";
import { SortDirection, SortIcon } from "@/components/SortIcon";
import {
  FetchLeaderboardSortType,
  type LeaderboardResponse,
} from "@/db/queries/leaderboard.types";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { Fragment, type MouseEventHandler } from "react";
import type { SWRInfiniteKeyedMutator } from "swr/infinite";
import useLeaderboardStore, { useLeaderboardQueryParams } from "./State";

export function LeaderboardTable(props: {
  entries: LeaderboardResponse[];

  /**
   * Function to load more data
   */
  loadMore: SWRInfiniteKeyedMutator<LeaderboardResponse[]>;

  /**
   * If an error occurs during fetching
   */
  error?: string;

  /**
   * Indicates if we are loading data in
   */
  isLoading: boolean;

  /**
   * Indicates whether there is more data that can be loaded
   */
  isMore: boolean;
  total: number | bigint;
  guildId: string;

  /**
   * Date of when data was last updated
   */
  fetched: number;
  children: ReactNode;
}) {
  useLeaderboardQueryParams();
  const auth = useSession();
  const state = useLeaderboardStore();

  // utility functions
  function createSortOnClick(
    clickSortBy: FetchLeaderboardSortType,
  ): MouseEventHandler<HTMLTableHeaderCellElement> {
    return () => {
      const direction =
        state.sortBy === clickSortBy
          ? state.sortDir === SortDirection.Desc
            ? SortDirection.Asc
            : SortDirection.Desc
          : SortDirection.Desc;

      state.setSortBy(clickSortBy);
      state.setSortDir(direction);
    };
  }

  function getSortDir(type: FetchLeaderboardSortType) {
    if (type === state.sortBy) {
      return state.sortDir;
    } else {
      return SortDirection.None;
    }
  }

  return (
    <div className="relative">
      <div className="mx-4 overflow-x-auto rounded-md bg-background-accent p-2 md:mx-auto">
        <table className="w-full table-auto text-white">
          <thead>
            <tr className="text-left [&>*]:border-table-border">
              <th className="whitespace-nowrap border-r px-4 py-2">
                <span className="inline-block md:hidden">#</span>
                <span className="hidden md:inline-block">Ranking</span>
              </th>
              <th className="w-full whitespace-nowrap border-r px-4 py-2">
                Username
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.MMR)}
              >
                MMR
                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.MMR)}
                />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.Wins)}
              >
                Wins
                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.Wins)}
                />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.Losses)}
              >
                Losses
                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.Losses)}
                />
              </th>
              <th
                className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-zinc-700"
                onClick={createSortOnClick(FetchLeaderboardSortType.Winrate)}
              >
                <span className="inline-block md:hidden">WR</span>
                <span className="hidden md:inline-block">Winrate</span>

                <SortIcon
                  direction={getSortDir(FetchLeaderboardSortType.Winrate)}
                />
              </th>
            </tr>
          </thead>
          <tbody>{props.children}</tbody>
        </table>

        {
          // if there are no entries, show a message
          props.entries.length === 0 && (
            <p className="my-14 text-center text-lg text-white">
              No results found.
            </p>
          )
        }

        {
          // if there is an error, show it
          props.error && (
            <p className="my-14 text-center text-lg text-white">
              An unexpected error has occured: {props.error}. Please try again
              later.
            </p>
          )
        }

        {/* <div className="w-full text-white"> */}
        <div className="flex w-full flex-row flex-wrap justify-between px-4 py-2 text-white">
          <p className="block w-fit">
            <>
              Showing{" "}
              {props.entries.reduce((acc, x) => (acc += x.data.length), 0)}/
              {props.total} entries.
            </>
          </p>
          <p className="block w-fit">
            Updated {Math.round((Date.now() - props.fetched) / 1000 / 60)}{" "}
            minutes ago.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-4 flex flex-col items-center gap-4">
        {props.isMore && (
          <Button
            variant="gray"
            className="mx-auto"
            disabled={props.isLoading}
            onClick={() => void props.loadMore()}
          >
            {props.isLoading ? "Loading..." : "Load More"}
          </Button>
        )}

        <div className="text-center">
          {auth.data?.user.name && (
            <p className="text-zinc-600">Logged in as {auth.data?.user.name}</p>
          )}
          <p className="text-zinc-600">
            Run{" "}
            <span className="box-content rounded-sm bg-zinc-800 p-1 text-zinc-400">
              /ign
            </span>{" "}
            to have your name appear here!
          </p>
        </div>
      </div>
    </div>
  );
}

export function LeaderboardTableEntries(props: {
  entries: LeaderboardResponse[];
}) {
  const auth = useSession();
  const searchFor = useLeaderboardStore((state) => state.searchFor);

  return props.entries.map((group, i) => (
    <Fragment key={i}>
      {group.data.map((entry, j) => (
        <tr key={`${j} ${entry.ign}`} className="[&>*]:border-table-border">
          <td className="whitespace-nowrap border border-l-0 px-4 py-2">
            {searchFor === "" ? i * 10 + j + 1 : "?"}
          </td>
          <td className="w-full border px-4 py-2">
            {entry.ign}
            {auth.status === "authenticated" &&
              entry.user_id == auth.data.user.id && (
                <span className="text-xs font-bold"> (YOU!)</span>
              )}
          </td>
          <td className="border px-4 py-2">{Math.round(entry.mmr)}</td>
          <td className="border px-4 py-2">{entry.wins}</td>
          <td className="border px-4 py-2">{entry.losses}</td>
          <td className="flex-nowrap border border-r-0 px-4 py-2">
            {Math.round(entry.winrate)}%
          </td>
        </tr>
      ))}
    </Fragment>
  ));
}
