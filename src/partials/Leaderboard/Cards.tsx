"use client";

import ChampionRankCard from "../../components/Leaderboard/Champion";
import RankCard from "../../components/Leaderboard/RankCard";
import { useMeasure } from "@react-hookz/web";
import { type LeaderboardEntry } from "../../db/queries/leaderboard";

export type LeaderboardCardProps = {
  index: number;
  entry: LeaderboardEntry;
};

export type LeaderboardCardsProps = {
  entries: LeaderboardEntry[];
};

export function LeaderboardCards(props: LeaderboardCardsProps) {
  const [measure, ref] = useMeasure<HTMLDivElement>();

  return (
    <div
      className="relative"
      style={{
        height: measure?.height,
      }}
    >
      <div className="absolute z-50 mb-6 -translate-y-20">
        <div
          className="flex w-screen flex-row flex-wrap justify-center gap-[14px] text-white"
          ref={ref}
        >
          {props.entries[0] && (
            <ChampionRankCard index={0} entry={props.entries[0]} />
          )}
          {props.entries[1] && <RankCard index={1} entry={props.entries[1]} />}
          {props.entries[2] && <RankCard index={2} entry={props.entries[2]} />}
        </div>
      </div>
    </div>
  );
}
