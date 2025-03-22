import type { DBGame } from "../enums";

export enum FetchLeaderboardSortType {
  Wins = "wins",
  Losses = "losses",
  MMR = "mmr",
  Winrate = "winrate"
}

export type FetchLeaderboardInput = {
  guild_id: bigint;
  sortBy?: FetchLeaderboardSortType;
  sortDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  withPageCount?: boolean;

  filters: {
    /**
     * Global refers to a queue_channel_id of 0, which is the global leaderboard.
     * Otherwise, this should be the channel id of the queue.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    queueId: "global" | (string & {});

    /**
     * Will only return rows that contain the given text
     */
    searchTerm: string;

    /**
     * Determines what videogame to show the leaderboard for.
     * By default, it's whatever is first in the database.
     */
    game: DBGame | "all";
  },
}

export type LeaderboardEntry = {
  ign: string;
  user_id: string;
  wins: number | null;
  losses: number | null;
  mmr: number;
  winrate: number;
}

export type LeaderboardResponse = {
  data: LeaderboardEntry[];
  total: number | bigint;
  fetched: number;
}

export type LeaderboardMetadata = {
  channels: {
    channel_id: bigint;
    unique_leaderboard: boolean | null;
  }[];

  games: {
    game: string;
  }[];
}
