import { create } from "zustand";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { LeaderboardState, LeaderboardActions } from "./LeaderboardUtils";
import { defaultValues, PARAMS_TO_PERSIST, VALIDATORS } from "./LeaderboardUtils";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return state;
};

export default useLeaderboardStore;
