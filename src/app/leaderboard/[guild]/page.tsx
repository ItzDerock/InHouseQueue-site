import Banner from "@/components/Banner";
import Navbar from "@/partials/Navbar";
import LeaderboardBanner from "@/assets/leaderboard.jpg";
import { notFound } from "next/navigation";
import {
  fetchLeaderboard,
  fetchLeaderboardOptions,
} from "@/db/queries/leaderboard";
import { getServerSession } from "next-auth";
import Redirect from "@/auth/Redirect";
import { authOptions } from "@/auth";
import { env } from "@/env.mjs";
import { Leaderboard } from "./_components/Leaderboard";
import { SortDirection } from "@/components/SortIcon";
import {
  buildLeaderboardQueryParams,
  parseQueryParameters,
} from "./_components/LeaderboardUtils";

export default async function LeaderboardPage({
  params,
  searchParams,
}: {
  params: { guild: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to login
    return <Redirect />;
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

  // parse the query parameters
  const options = parseQueryParameters(searchParams, true);

  // fetch the data so it is already ready on the client
  const [leaderboard, meta] = await Promise.all([
    fetchLeaderboard({
      guild_id: BigInt(guild),
      limit: 10,
      withPageCount: true,
      sortDirection:
        options.sortDir === SortDirection.None
          ? SortDirection.Desc
          : options.sortDir,
      sortBy: options.sortBy,
      filters: {
        game: options.game,
        queueId: options.leaderboard,
        searchTerm: "",
      },
    }),
    fetchLeaderboardOptions(guild),
  ]);

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

      <Leaderboard
        guildId={guild}
        initialData={{
          data: leaderboard,
          optionsHash: buildLeaderboardQueryParams({
            ...options,
            searchFor: "",
          }).toString(),
        }}
        meta={meta}
      />
    </>
  );
}
