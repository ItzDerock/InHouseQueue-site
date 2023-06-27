import { type NextRequest, NextResponse } from "next/server";
import { fetchLeaderboard } from "../../../../db/queries/leaderboard";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      guild: string;
    };
  }
) {
  // get query params
  const searchParams = new URL(request.url).searchParams;

  return NextResponse.json(
    await fetchLeaderboard({
      guild_id: BigInt(params.guild),
      withPageCount: true,
      sortBy: searchParams.get("sortBy"),
    })
  );
}
