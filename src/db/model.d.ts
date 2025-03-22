
export interface Games {
  game_id: string | null;
  lobby_id: number | null;
  voice_red_id: number | null;
  voice_blue_id: number | null;
  red_role_id: number | null;
  blue_role_id: number | null;
  queuechannel_id: number | null;
  msg_id: number | null;
  game: string | null;
}

export interface Igns {
  guild_id: bigint | null;
  user_id: bigint | null;
  game: string | null;
  ign: string | null;
}

export interface MmrRating {
  guild_id: bigint | null;
  user_id: bigint | null;
  mu: string | null;
  sigma: string | null;
  counter: number | null;
  game: string | null;
  queue_channel_id: bigint | null;
  time: number | null;
}

export interface Points {
  guild_id: bigint | null;
  user_id: bigint | null;
  wins: number | null;
  losses: number | null;
  game: string | null;
  queue_channel_id: bigint | null;
}

export interface QueueChannels {
  guild_id: bigint | null;
  channel_id: bigint | null;
  unique_leaderboard: boolean | null;
}

export interface DB {
  games: Games;
  igns: Igns;
  mmr_rating: MmrRating;
  points: Points;
  queuechannels: QueueChannels;
}
