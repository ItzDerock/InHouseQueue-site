import Banner from "../../../components/Banner";
import Navbar from "../../../partials/Navbar";
import LeaderboardBanner from "../../../assets/leaderboard.jpg";
import { LeaderboardCards } from "../../../partials/Leaderboard/Cards";
import { notFound } from "next/navigation";
import { fetchLeaderboard } from "../../../db/queries/leaderboard";
import { getServerSession } from "next-auth";
import Redirect from "../../../auth/Redirect";
import { Table } from "../../../partials/Leaderboard/Table";
import { authOptions } from "../../../auth";
import { env } from "../../../env.mjs";

export default async function LeaderboardPage({
  params,
}: {
  params: { guild: string };
}) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to login
    return <Redirect />;
    // return redirect("/api/auth/signin/discord");
  }

  if (
    !env.DISABLE_GUILD_CHECKING &&
    !session.user.guilds.includes(params.guild)
  ) {
    return (
      <div className="flex h-96 w-full flex-col justify-center p-4 align-middle">
        <p className="text-center text-white">
          You do not have access to this page
        </p>
      </div>
    );
  }

  const guild = params.guild;

  // first check that guild matches a snowflake
  if (!/^\d+$/.test(guild)) {
    return notFound();
  }

  // fetch the data
  const data = await fetchLeaderboard({
    guild_id: BigInt(guild),
    limit: 10,
    withPageCount: true,
  });

  // if no data, 404
  if (data.total === 0) {
    return notFound();
  }

  // get the top3
  const top3 = data.data.slice(0, 3);

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
      <Table
        guildId={guild}
        defaultEntries={data.data}
        total={data.total}
        fetched={data.fetched}
      />
    </>
  );
}
