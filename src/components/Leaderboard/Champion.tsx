import { type LeaderboardCardProps } from "../../partials/Leaderboard/Cards";

export default function ChampionRankCard(props: LeaderboardCardProps) {
  return (
    <div
      className="z-50 rounded-md bg-gradient-to-tr from-secondary to-primary p-[18px]"
      data-aos="fade-up"
      data-aos-delay={props.index * 100}
    >
      <h2 className="mx-auto w-fit text-3xl font-bold md:ml-0">CHAMPION</h2>
      <div className="mx-auto flex w-fit flex-row flex-wrap justify-center gap-7 align-middle">
        <h1 className="text-8xl font-extrabold">1ST</h1>
        <div>
          <h2 className="text-[32px] font-bold">{props.entry.ign}</h2>
          <p className="text-[32px]">{Math.round(props.entry.mmr)} MMR</p>
        </div>
      </div>
    </div>
  );
}
