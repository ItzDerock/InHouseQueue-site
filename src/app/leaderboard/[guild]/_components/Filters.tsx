"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import useLeaderboardStore from "./State";
import type { LeaderboardMetadata } from "@/db/queries/leaderboard.types";
import { type DBGame, GameToFriendlyName } from "@/db/enums";

type LeaderboardFiltersProps = {
  meta: LeaderboardMetadata;
};

/**
 * Partial for the Leaderboard page that renders the filters (ie. select game, select leaderboard)
 * @param props basic metadata for what games and channels are available
 * @returns
 */
export function LeaderboardFilters(props: LeaderboardFiltersProps) {
  // cannot select all state at once, causes infinite rerender loop
  // i.e (state => ({ leaderboard: state.leaderboard, game: state.game }))
  const channel = useLeaderboardStore((state) => state.leaderboard);
  const game = useLeaderboardStore((state) => state.game);
  const updateChannel = useLeaderboardStore((state) => state.setLeaderboard);
  const updateGame = useLeaderboardStore((state) => state.setGame);

  return (
    <div className="mb-4 flex flex-row gap-4">
      <Select value={channel} onValueChange={updateChannel}>
        <SelectTrigger>
          <SelectValue placeholder="Global Leaderboard" />
        </SelectTrigger>
        <SelectContent>
          {/* Always a global leaderboard */}
          <SelectItem value="global">Global Leaderboard</SelectItem>

          {props.meta.channels.map((channel, idx) => (
            <SelectItem
              key={channel.channel_id}
              value={channel.channel_id.toString()}
            >
              {channel.unique_leaderboard
                ? "Unique Leaderboard " + ++idx
                : "Global Leaderboard"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={game} onValueChange={updateGame}>
        <SelectTrigger>
          <SelectValue placeholder="All Games" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Games</SelectItem>
          {props.meta.games.map((game) => (
            <SelectItem key={game.game} value={game.game}>
              {game.game in GameToFriendlyName
                ? GameToFriendlyName[game.game as DBGame]
                : game.game}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
