"use client";

import { type MouseEventHandler, useState } from "react";
import {
  FetchLeaderboardSortType,
  type LeaderboardEntry,
} from "../../db/queries/leaderboard.types";
import { SortDirection, SortIcon } from "../SortIcon";

export function Table(props: { defaultEntries: LeaderboardEntry[] }) {
  const [sortBy, setSortBy] = useState<FetchLeaderboardSortType>(
    FetchLeaderboardSortType.MMR
  );

  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.Desc);

  function createSortOnClick(
    clickSortBy: FetchLeaderboardSortType
  ): MouseEventHandler<HTMLTableHeaderCellElement> {
    return (e) => {
      e.preventDefault();
      let direction: SortDirection;
      if (clickSortBy === sortBy) {
        if (sortDir === SortDirection.Desc) {
          direction = SortDirection.Asc;
        } else {
          direction = SortDirection.Desc;
        }
      } else {
        direction = SortDirection.Desc;
      }

      setSortBy(clickSortBy);
      setSortDir(direction);
    };
  }

  function getSortDir(type: FetchLeaderboardSortType) {
    if (type === sortBy) {
      return sortDir;
    } else {
      return SortDirection.None;
    }
  }

  // const [entries, setEntries] = useState(props.defaultEntries);
  return (
    <>
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
              <SortIcon direction={getSortDir(FetchLeaderboardSortType.MMR)} />
            </th>
            <th
              className="cursor-pointer whitespace-nowrap border-r px-4 py-2 hover:bg-zinc-700"
              onClick={createSortOnClick(FetchLeaderboardSortType.Wins)}
            >
              Wins
              <SortIcon direction={getSortDir(FetchLeaderboardSortType.Wins)} />
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
        <tbody>
          {props.defaultEntries.map((entry, i) => (
            <tr key={`${i} ${entry.ign}`} className="[&>*]:border-table-border">
              <td className="whitespace-nowrap border border-l-0 px-4 py-2">
                {i + 1}
              </td>
              <td className="w-full border px-4 py-2">{entry.ign}</td>
              <td className="border px-4 py-2">{Math.round(entry.mmr)}</td>
              <td className="border px-4 py-2">{entry.wins}</td>
              <td className="border px-4 py-2">{entry.losses}</td>
              <td className="flex-nowrap border border-r-0 px-4 py-2">
                {Math.round(entry.winrate)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="w-full text-white"> */}
      <div className="flex w-full flex-row flex-wrap justify-between px-4 py-2 text-white">
        <p className="block w-fit">Showing 10/50 entries.</p>
        <p className="block w-fit">Updated 5 minutes ago.</p>
      </div>
    </>
  );
}
