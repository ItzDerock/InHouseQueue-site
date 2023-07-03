"use client";

import { type MouseEventHandler, useState, useEffect } from "react";
import {
  FetchLeaderboardSortType,
  type LeaderboardResponse,
  type LeaderboardEntry,
} from "../../db/queries/leaderboard.types";
import Button from "../../components/Button";
import { SortDirection, SortIcon } from "../../components/SortIcon";
import { useSession } from "next-auth/react";
import { IoMdSearch } from "react-icons/io";
import { useDebouncedState } from "@react-hookz/web";

export function Table(props: {
  defaultEntries: LeaderboardEntry[];
  total: number | bigint;
  guildId: string;
  fetched: number;
}) {
  const auth = useSession();

  // data options states
  const [searchFor, setSearchFor] = useDebouncedState("", 500);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.Desc);
  const [sortBy, setSortBy] = useState<FetchLeaderboardSortType>(
    FetchLeaderboardSortType.MMR
  );
  const [changedSort, setChangedSort] = useState(false);

  // data state
  const [entries, setEntries] = useState(props.defaultEntries);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState("");
  const isMore = entries.length < props.total;

  // data updater hook
  useEffect(() => {
    if (!loadMore && !changedSort) return;
    setError("");

    let oldEntries = entries;
    if (changedSort) setEntries((oldEntries = []));

    const params = new URLSearchParams();
    params.set("sortBy", sortBy);
    params.set("sortDirection", sortDir);
    params.set("page", Math.ceil(oldEntries.length / 10).toString());
    params.set("searchFor", searchFor);

    console.log(`Current page: ${params.get("page") ?? ""}`);

    void fetch(`/api/leaderboard/${props.guildId}?${params.toString()}`, {
      credentials: "include",
    })
      .then(
        (res) =>
          res.json() as Promise<
            LeaderboardResponse | { error: { message: string } }
          >
      )
      .then((data) => {
        // check status code
        if ("error" in data) {
          setError(data.error.message);
          return;
        } else {
          console.log(`Recieved ${data.data.length} entries`);
          setEntries([...oldEntries, ...data.data]);
        }

        setLoadMore(false);
        setChangedSort(false);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortDir, props.guildId, loadMore, searchFor]);

  // utility functions
  function createSortOnClick(
    clickSortBy: FetchLeaderboardSortType
  ): MouseEventHandler<HTMLTableHeaderCellElement> {
    return () => {
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

      setChangedSort(true);
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
      <div className="relative mx-auto w-full max-w-[1024px]">
        <input
          type="text"
          placeholder="Search for player. (User ID or IGN)"
          className="my-7 w-full rounded-md border border-gray-600 bg-background-main p-2 text-white"
          // update keywords
          onChange={(e) => {
            setSearchFor(e.target.value);
            setChangedSort(true);
          }}
        />

        {/* search icon */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 transform text-primary">
          <IoMdSearch />
        </div>
      </div>

      <div className="mx-4 w-auto max-w-[1024px] overflow-x-auto rounded-md bg-background-accent p-2 md:mx-auto">
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
          <tbody>
            {entries.map((entry, i) => (
              <tr
                key={`${i} ${entry.ign}`}
                className="[&>*]:border-table-border"
              >
                <td className="whitespace-nowrap border border-l-0 px-4 py-2">
                  {searchFor === "" ? i + 1 : "?"}
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
          </tbody>
        </table>

        {
          // if there are no entries, show a message
          entries.length === 0 && (
            <p className="my-6 text-center text-lg text-white">
              {changedSort ? "Loading..." : "No results found."}
            </p>
          )
        }

        {
          // if there is an error, show it
          error !== "" && (
            <p className="my-6 text-center text-lg text-white">
              Error: {error}
            </p>
          )
        }

        {/* <div className="w-full text-white"> */}
        <div className="flex w-full flex-row flex-wrap justify-between px-4 py-2 text-white">
          <p className="block w-fit">
            <>
              Showing {entries.length}/{props.total} entries.
            </>
          </p>
          <p className="block w-fit">
            Updated {Math.round((Date.now() - props.fetched) / 1000 / 60)}{" "}
            minutes ago.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-4 flex flex-col items-center gap-4">
        {isMore && (
          <Button
            variant="gray"
            className="mx-auto"
            disabled={loadMore ?? isMore}
            onClick={() => setLoadMore(true)}
          >
            {loadMore ? "Loading..." : "Load More"}
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
    </>
  );
}
