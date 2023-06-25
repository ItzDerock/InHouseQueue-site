"use client";

import ChampionRankCard from "../../components/Leaderboard/Champion";
import RankCard from "../../components/Leaderboard/RankCard";
import { useMeasure } from "@react-hookz/web";

export type LeaderboardCardProps = {
  index: number;
};

export function LeaderboardCards() {
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
          <ChampionRankCard index={0} />
          <RankCard index={1} />
          <RankCard index={2} />
        </div>
      </div>
    </div>
  );
}
