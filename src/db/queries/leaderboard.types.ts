export enum FetchLeaderboardSortType {
  Wins = "wins",
  Losses = "losses",
  MMR = "mmr",
  Winrate = "winrate"
}

export type FetchLeaderboardInput = {
  guild_id: bigint;
  /** If provided, this function will only fetch rows that contain the given text. */
  searchFor?: string;
  sortBy?: FetchLeaderboardSortType;
  sortDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  withPageCount?: boolean;
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