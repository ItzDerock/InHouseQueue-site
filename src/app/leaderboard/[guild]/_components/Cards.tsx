"use client";

import ChampionRankCard from "@/components/Leaderboard/Champion";
import RankCard from "@/components/Leaderboard/RankCard";
import { type LeaderboardEntry } from "../../../../db/queries/leaderboard.types";

export type LeaderboardCardProps = {
  index: number;
  entry: LeaderboardEntry;
};

export type LeaderboardCardsProps = {
  entries: LeaderboardEntry[];
};

export function LeaderboardCards(props: LeaderboardCardsProps) {
  return (
    <div className="z-50 mb-12 -mt-24 w-full">
      <div
        className="flex w-full flex-col justify-center gap-[14px] px-4 md:px-0 text-white md:flex-row"
      >
        {props.entries[0] && (
          <ChampionRankCard index={0} entry={props.entries[0]} />
        )}
        {props.entries[1] && <RankCard index={1} entry={props.entries[1]} />}
        {props.entries[2] && <RankCard index={2} entry={props.entries[2]} />}
      </div>
    </div>
  );
}
