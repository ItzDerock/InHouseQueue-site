import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../auth";
import { fetchLeaderboard } from "../../../../db/queries/leaderboard";
import { FetchLeaderboardSortType } from "../../../../db/queries/leaderboard.types";

const SORT_BY_VALUES = Object.values(FetchLeaderboardSortType) as string[];
const SORT_DIR_VALUES = ["asc", "desc"];

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
  const sortBy = searchParams.get("sortBy") ?? FetchLeaderboardSortType.MMR;
  const sortDirection = searchParams.get("sortDirection") ?? "desc";
  const page = parseInt(searchParams.get("page") ?? "0");

  // validate
  if (!SORT_BY_VALUES.includes(sortBy)) {
    return NextResponse.json({
      data: [],
      error: "Invalid sortBy value",
    });
  }

  if (!SORT_DIR_VALUES.includes(sortDirection)) {
    return NextResponse.json({
      data: [],
      error: "Invalid sortDirection value",
    });
  }

  if (isNaN(page) || page < 0) {
    return NextResponse.json({
      data: [],
      error: "Invalid offset value",
    });
  }

  if (!/^\d+$/.test(params.guild)) {
    return NextResponse.json({
      data: [],
      error: "Invalid guild ID",
    });
  }

  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({
      data: [],
      error: "Not logged in",
    });
  }

  return NextResponse.json(
    await fetchLeaderboard({
      guild_id: BigInt(params.guild),
      sortBy: sortBy as FetchLeaderboardSortType,
      sortDirection: sortDirection as "asc" | "desc",
      limit: 10,
      offset: page * 10,
    })
  );
}
