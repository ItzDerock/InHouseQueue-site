import { SortDirection } from "@/components/SortIcon";
import { DBGame } from "@/db/enums";
import { FetchLeaderboardSortType } from "@/db/queries/leaderboard.types";
import { z } from "zod";

/**
 * State for leaderboard pages
 */
export type LeaderboardState = {
  searchFor: string | null;
  sortDir: SortDirection;
  sortBy: FetchLeaderboardSortType;
  leaderboard: string;
  game: DBGame | "all";
  page: number;
};

/**
 * Actions that can be performed on the state
 */
export type LeaderboardActions = {
  setSearchFor: (value: LeaderboardState["searchFor"]) => void;
  setSortDir: (value: LeaderboardState["sortDir"]) => void;
  setSortBy: (value: LeaderboardState["sortBy"]) => void;
  setLeaderboard: (value: LeaderboardState["leaderboard"]) => void;
  setGame: (value: LeaderboardState["game"]) => void;
  setPage: (value: LeaderboardState["page"]) => void;
};

/**
 * The parameters to persist in the URL query
 */
export const PARAMS_TO_PERSIST = [
  "sortDir",
  "sortBy",
  "leaderboard",
  "game",
  "page",
] as const;

/**
 * Zod validators for each state to be persisted
 */
export const VALIDATORS = {
  searchFor: z.string().default(""),
  sortDir: z.nativeEnum(SortDirection),
  sortBy: z.nativeEnum(FetchLeaderboardSortType),
  leaderboard: z
    .string()
    .regex(/^([0-9]{15,20})|(global)$/)
    .default("global"),
  game: z.nativeEnum(DBGame),
  page: z.coerce.number(),
} as const;

/**
 * Default options for the state
 */
export const defaultValues = {
  searchFor: "",
  sortDir: SortDirection.None,
  sortBy: FetchLeaderboardSortType.MMR,
  leaderboard: "global",
  game: DBGame.LeagueOfLegends,
  page: 0,
} satisfies LeaderboardState;

/**
 * Parse query parameters from a URLSearchParams object or a record of strings
 * @param queryParams
 * @param useDefaults
 * @returns
 */
export function parseQueryParameters<
  T extends boolean,
  R = Pick<LeaderboardState, (typeof PARAMS_TO_PERSIST)[number]>,
>(
  queryParams: URLSearchParams | Record<string, string | string[] | undefined>,
  useDefaults?: T,
): T extends true ? R : Partial<R> {
  // normalize the query parameters to a single type
  const params =
    queryParams instanceof URLSearchParams
      ? Object.fromEntries(queryParams)
      : queryParams;

  // parse and validate the parameters
  const parsed = {} as Record<string, unknown>;
  for (const key of PARAMS_TO_PERSIST) {
    let value = params[key];

    // select first value if array
    if (Array.isArray(value)) {
      value = value[0];
    }

    const validator = VALIDATORS[key];
    const parsedValue = validator.safeParse(value);

    if (parsedValue.success) {
      parsed[key] = parsedValue.data;
    } else {
      if (useDefaults) {
        parsed[key] = defaultValues[key];
      }
    }
  }

  return parsed as T extends true ? R : Partial<R>;
}

export function buildLeaderboardQueryParams(
  state: Pick<
    LeaderboardState,
    "sortBy" | "sortDir" | "searchFor" | "game" | "leaderboard"
  >,
) {
  const searchParams = new URLSearchParams();
  searchParams.set("sortBy", state.sortBy);
  searchParams.set(
    "sortDirection",
    state.sortDir === SortDirection.None ? SortDirection.Desc : state.sortDir,
  );
  searchParams.set("searchFor", state.searchFor ?? "");
  searchParams.set("game", state.game);
  searchParams.set("leaderboard", state.leaderboard);
  return searchParams;
}
