import { DBGame } from "@/db/enums";
import { FetchLeaderboardSortType } from "@/db/queries/leaderboard.types";
import { create } from "zustand";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { SortDirection } from "@/components/SortIcon";

/**
 * State for leaderboard pages
 */
type LeaderboardState = {
  searchFor: string | null;
  sortDir: SortDirection;
  sortBy: FetchLeaderboardSortType;
  leaderboard: string;
  game: string;
  page: number;
};

/**
 * Actions that can be performed on the state
 */
type LeaderboardActions = {
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
const PARAMS_TO_PERSIST = [
  "sortDir",
  "sortBy",
  "leaderboard",
  "game",
  "page",
] as const;

/**
 * Zod validators for each state to be persisted
 */
const VALIDATORS = {
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
const defaultValues = {
  searchFor: "",
  sortDir: SortDirection.None,
  sortBy: FetchLeaderboardSortType.MMR,
  leaderboard: "global",
  game: DBGame.LeagueOfLegends,
  page: 0,
} satisfies LeaderboardState;

/**
 * Shared state for leaderboard configuration
 */
const useLeaderboardStore = create<LeaderboardState & LeaderboardActions>(
  (set) => ({
    // Data state
    ...defaultValues,

    // Update functions
    setSearchFor: (value) => set({ searchFor: value }),
    setSortDir: (value) => set({ sortDir: value }),
    setSortBy: (value) => set({ sortBy: value }),
    setLeaderboard: (value) => set({ leaderboard: value }),
    setGame: (value) => set({ game: value }),
    setPage: (value) => set({ page: value }),
  }),
);

/**
 * Utility hook to sync query params with state
 */
export const useLeaderboardQueryParams = () => {
  // const pathname = usePathname();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const state = useLeaderboardStore();

  /**
   * Loads the state from the query params
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    for (const key of PARAMS_TO_PERSIST) {
      const value = params.get(key);
      const keyUpper = (key.charAt(0).toUpperCase() +
        key.slice(1)) as Capitalize<typeof key>;

      if (value != null) {
        // attempt to validate
        const validator = VALIDATORS[key];
        const parsed = validator.safeParse(value);

        if (parsed.success) {
          state[`set${keyUpper}`](parsed.data as unknown as never);
        } else {
          console.error(
            `Validation failed for query param ${key}:`,
            parsed.error.errors,
          );
        }
      }
    }
  }, []);

  /**
   * Updates the query params when the state changes
   */
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    for (const key of PARAMS_TO_PERSIST) {
      if (state[key] == null || state[key] === defaultValues[key]) {
        params.delete(key);
      } else {
        params.set(key, state[key]?.toString());
      }
    }

    // router.push(pathname + "?" + params.toString());
    // ^ This causes a refresh, so instead we use replaceState
    // https://stackoverflow.com/questions/62845014/change-url-without-page-refresh-next-js
    window.history.replaceState({}, "", "?" + params.toString());
  }, [state]);

  return state;
};

export default useLeaderboardStore;
