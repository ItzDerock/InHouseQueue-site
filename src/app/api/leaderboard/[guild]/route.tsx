
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../auth";
import { fetchLeaderboard } from "../../../../db/queries/leaderboard";
import { FetchLeaderboardSortType } from "../../../../db/queries/leaderboard.types";
import { env } from "../../../../env.mjs";
import { getRealIP } from "../../../../utils";
import { initRateLimit } from "../../../../utils/rate-limit";
import z from "zod";
import { DBGame } from "@/db/enums";

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

const querySchema = z.object({
  sortBy: z.nativeEnum(FetchLeaderboardSortType)
    .optional()
    .default(FetchLeaderboardSortType.MMR),
  sortDirection: z.enum(["asc", "desc"])
    .optional()
    .default("desc"),
  page: z.coerce.number().int().min(0).default(0),
  searchFor: z.string().optional(),
  game: z.nativeEnum(DBGame).or(z.literal("all")).optional(),
  leaderboard: z.string().regex(/^([0-9]{19,22})|(global)$/)
});

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

  const query = querySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams.entries())
  );

  if (!query.success) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Invalid parameters",
        validationErrors: query.error.errors
      },
    }, {
      status: 400
    });
  }

  if (!/^\d+$/.test(params.guild)) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Invalid guild ID",
      },
    }, {
      status: 400
    });
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({
      data: [],
      error: {
        message: "Not logged in",
      },
    }, {
      status: 401
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
    }, {
      status: 403
    });
  }

  const rateLimited = query.data.searchFor
    ? await searchRateLimit(request)
    : await leaderboardRateLimit(request);

  if (rateLimited.status !== 200) return rateLimited;

  return NextResponse.json(
    await fetchLeaderboard({
      guild_id: BigInt(params.guild),
      sortBy: query.data.sortBy,
      sortDirection: query.data.sortDirection,
      limit: 10,
      offset: query.data.page * 10,
      withPageCount: true,
      filters: {
        searchTerm: query.data.searchFor ?? "",
        game: query.data.game ?? DBGame.LeagueOfLegends,
        queueId: query.data.leaderboard,
      }
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
