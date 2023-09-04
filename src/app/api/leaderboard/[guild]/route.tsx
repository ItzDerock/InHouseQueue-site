import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../auth";
import { fetchLeaderboard } from "../../../../db/queries/leaderboard";
import { FetchLeaderboardSortType } from "../../../../db/queries/leaderboard.types";
import { env } from "../../../../env.mjs";
import { getRealIP } from "../../../../utils";
import { initRateLimit } from "../../../../utils/rate-limit";

const SORT_BY_VALUES = Object.values(FetchLeaderboardSortType) as string[];
const SORT_DIR_VALUES = ["asc", "desc"];

const searchRateLimit = initRateLimit((request) => ({
  id: `search:${getRealIP(request)}`,
  limit: 20,
  timeframe: 60,
}));

const leaderboardRateLimit = initRateLimit((request) => ({
  id: `guild:${getRealIP(request)}`,
  limit: 60,
  timeframe: 60,
}));

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
  const searchFor = searchParams.get("searchFor");

  // validate
  if (!SORT_BY_VALUES.includes(sortBy)) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Invalid sortBy value",
      },
    });
  }

  if (!SORT_DIR_VALUES.includes(sortDirection)) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Invalid sortDirection value",
      },
    });
  }

  if (isNaN(page) || page < 0) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Invalid offset value",
      },
    });
  }

  if (!/^\d+$/.test(params.guild)) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Invalid guild ID",
      },
    });
  }

  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Not logged in",
      },
    });
  }

  if (
    !env.DISABLE_GUILD_CHECKING &&
    !session.user.guilds.includes(params.guild)
  ) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Not in guild",
      },
    });
  }

  // check rate limit
  const rateLimited = searchFor
    ? await searchRateLimit(request)
    : await leaderboardRateLimit(request);

  if (rateLimited.status !== 200) return rateLimited;

  return NextResponse.json(
    await fetchLeaderboard({
      guild_id: BigInt(params.guild),
      sortBy: sortBy as FetchLeaderboardSortType,
      sortDirection: sortDirection as "asc" | "desc",
      limit: 10,
      offset: page * 10,
      searchFor: searchFor ?? undefined,
    }),
    {
      status: 200,
      headers: {
        ...rateLimited.headers,
        "Cache-Control": "private, max-age=60",
      },
    }
  );
}
