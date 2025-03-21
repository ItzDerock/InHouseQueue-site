"use client";

import { IoMdSearch } from "react-icons/io";
import useLeaderboardStore from "./State";

export function LeaderboardSearch() {
  const updateSearch = useLeaderboardStore((state) => state.setSearchFor);

  return (
    <div className="relative mx-auto mb-4 mt-7 w-full">
      <input
        type="text"
        placeholder="Search for player. (User ID or IGN)"
        className="w-full rounded-md border border-gray-600 bg-background-main p-2 text-white"
        onChange={(e) => {
          updateSearch(e.target.value);
        }}
      />

      <div className="absolute right-2 top-1/2 -translate-y-1/2 transform text-primary">
        <IoMdSearch />
      </div>
    </div>
  );
}
