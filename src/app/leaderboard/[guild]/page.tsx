import Banner from "../../../components/Banner";
import Navbar from "../../../partials/Navbar";
import LeaderboardBanner from "../../../assets/leaderboard.jpg";
import { LeaderboardCards } from "../../../partials/Leaderboard/Cards";
import { notFound, redirect } from "next/navigation";
import { fetchLeaderboard } from "../../../db/queries/leaderboard";
import { getServerSession } from "next-auth";
import Redirect from "../../../auth/Redirect";
import { Table } from "../../../components/Leaderboard/Table";

export default async function LeaderboardPage({
  params,
  searchParams,
}: {
  params: { guild: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  // check session
  const session = await getServerSession();
  if (!session) {
    // redirect to login
    return <Redirect />;
    // return redirect("/api/auth/signin/discord");
  }

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

  // fetch the data
  const data = await fetchLeaderboard({
    guild_id: BigInt(guild),
    offset: (pageNum - 1) * 10,
    limit: 10,
    withPageCount: true,
  });

  // if no data, 404
  if (data.total === 0) {
    return notFound();
  }

  // get the top3
  const top3 =
    pageNum === 1
      ? data.data.slice(0, 3)
      : (
          await fetchLeaderboard({
            guild_id: BigInt(guild),
            offset: 0,
            limit: 3,
            withPageCount: false,
          })
        ).data;

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
        <LeaderboardCards entries={top3} />
      </div>

      {/* table */}

      <div className="mx-4 w-auto max-w-[1024px] overflow-x-auto rounded-md bg-background-accent p-2 md:mx-auto">
        <Table defaultEntries={data.data} />
      </div>
    </>
  );
}
