/**
 * Represents all the supported games, mapping to the game's name in the database.
 */
export enum DBGame {
  LeagueOfLegends = "lol",
  Valorant = "valorant",
  Overwatch = "overwatch",
  Dota2 = "dota2",
  Crossfire = "crossfire",
  PokemonUnite = "pokemon_unite",
  Custom = "custom"
};

export const GameToFriendlyName = {
  [DBGame.LeagueOfLegends]: "League of Legends",
  [DBGame.Valorant]: "Valorant",
  [DBGame.Overwatch]: "Overwatch",
  [DBGame.Dota2]: "Dota 2",
  [DBGame.Crossfire]: "Crossfire",
  [DBGame.PokemonUnite]: "Pokemon Unite",
  [DBGame.Custom]: "Custom"
} as const;
