import Banner from "../../../components/Banner";
import Navbar from "../../../partials/Navbar";
import LeaderboardBanner from "../../../assets/leaderboard.jpg";
import { LeaderboardCards } from "../../../partials/Leaderboard/Cards";
import { notFound } from "next/navigation";
import { fetchLeaderboard } from "../../../db/queries/leaderboard";

export default async function LeaderboardPage({
  params,
  searchParams,
}: {
  params: { guild: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  let pageNum =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const guild = params.guild;

  // first check that guild matches a snowflake
  if (!/^\d+$/.test(guild)) {
    return notFound();
  }

  // then check that page number is valid
  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1;
  }

  // now fetch the top 3 from the database as well as 10 from the page
  const data = await fetchLeaderboard({
    guild_id: BigInt(guild),
    offset: (pageNum - 1) * 10,
    limit: 10,
  });

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
