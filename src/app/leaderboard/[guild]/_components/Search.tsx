"use client";

import { IoMdSearch } from "react-icons/io";
import useLeaderboardStore from "./State";
import { useEffect } from "react";
import { useDebouncedState } from "@react-hookz/web";

export function LeaderboardSearch() {
  const updateSearch = useLeaderboardStore((state) => state.setSearchFor);
  const [searchTerm, setSearchTerm] = useDebouncedState("", 500);

  // update search term when debounced
  // prevent request spam
  useEffect(() => {
    updateSearch(searchTerm);
  }, [searchTerm, updateSearch]);

  return (
    <div className="relative mx-auto mb-4 mt-7 w-full">
      <input
        type="text"
        placeholder="Search for player. (User ID or IGN)"
        className="w-full rounded-md border border-gray-600 bg-background-main p-2 text-white"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <div className="absolute right-2 top-1/2 -translate-y-1/2 transform text-primary">
        <IoMdSearch />
      </div>
    </div>
  );
}
