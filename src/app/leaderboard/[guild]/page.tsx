import Banner from "../../../components/Banner";
import Navbar from "../../../partials/Navbar";
import LeaderboardBanner from "../../../assets/leaderboard.jpg";
import { LeaderboardCards } from "../../../partials/Leaderboard/Cards";

export default function LeaderboardPage() {
  return (
    <>
      <Navbar absolute />

      {/* On desktops, make it so you can see the full banner, otherwise we need to explicity set a size. */}
      <div className="z-0 hidden md:block">
        <Banner image={LeaderboardBanner} height="image-height" />
      </div>
      <div className="z-0 md:hidden">
        <Banner image={LeaderboardBanner} height="36vh" />
      </div>

      {/* cards */}
      <div className="relative">
        <LeaderboardCards />
      </div>

      {/* table */}
      <h1>table here</h1>
    </>
  );
}
