// edit this object to add/remove commands
const commands = [
  // ~ Admin
  {
    "name": "reset",
    "type": "Admin",
    "description": "Reset scores or MMR of an individual or the entire server. Remove everyone from a queue.",
    "usage": [
      "/reset leaderboard",
      "/reset user [member]",
      "/reset queue [gameid]",
      "/reset mmr [member](optional)"
      ],
    "examples": [
      "/reset leaderboard",
      "/reset user @John",
      "/reset queue 03134ff5",
      "/reset mmr @John"
    ]
  },
  {
    "name": "void",
    "type": "Admin",
    "description": "Purge all records of a game. Used if players get \"stuck\" in a match and cannot queue.",
    "usage": [
      "/void [gameid]"
    ],
    "examples": [
      "/void 03134ff5"
    ]
  },
  {
    "name": "change_winner",
    "type": "Admin",
    "description": "Change the results of a finished game.",
    "usage": [
      "/change_winner [gameid] [team]"
    ],
    "examples": [
      "/change_winner 03134ff5 Red"
    ]
  },
  {
    "name": "winner",
    "type": "Admin",
    "description": "Set a winner for an ongoing game without requiring a vote.",
    "usage": [
      "/winner [role]"
    ],
    "examples": [
      "/winner @Red: 316d8cc7"
    ]
  },
  {
    "name": "queue_preference",
    "type": "Admin",
    "description": "Decide if players can be in multiple queues at once.",
    "usage": [
      "/queue_preference [options] "
    ],
    "examples": [
      "/queue_preference Single Queue"
    ]
  },
  {
    "name": "sbmm",
    "type": "Admin",
    "description": "Toggle Skill",
    "usage": [
      "/sbmm [options]"
    ],
    "examples": [
      "/sbmm Disable"
    ]
  },
  {
    "name": "cancel",
    "type": "Admin",
    "description": "Cancel an ongoing match",
    "usage": [
      "/cancel [gameid]"
    ],
    "examples": [
      "/cancel 03134ff5"
    ]
  },
  {
    "name": "grant",
    "type": "Admin",
    "description": "Give a Discord role the permissions to run a specific admin command",
    "usage": [
      "/grant_queue_commands [role] [command]",
      "/grant_server_commands [role] [command]",
      "/grant_game_commands [role] [command]",
      "/grant_leaderboard_commands [role] [command]"
    ],
    "examples": [
      "/grant_queue_commands @Moderators Reset a queue"
    ]
  },
  {
    "name": "revoke",
    "type": "Admin",
    "description": "Remove the admin command from a discord role you previously set",
    "usage": [
      "/revoke_queue_commands [role] [command]",
      "/revoke_server_commands [role] [command]",
      "/revoke_game_commands [role] [command]",
      "/revoke_leaderboard [role] [command]"
    ],
    "examples": [
      "/revoke_queue_commands @Moderators Reset a queue"
    ]
  },
  {
    "name": "user_dequeue",
    "type": "Admin",
    "description": "Remove single user from an ongoing queue",
    "usage": [
      "/user_dequeue [member]"
    ],
    "examples": [
      "/user_dequeue @John"
    ]
  },
  {
    "name": "duo_queue",
    "type": "Admin",
    "description": "Toggle Duo queuing",
    "usage": [
      "/duo_queue [options]"
    ],
    "examples": [
      "/duo_queue Enable"
    ]
  },
  {
    "name": "setregion",
    "type": "Admin",
    "description": "Update the region of an existing channel. (LoL only)",
    "usage": [
      "/setregion [#channelname] [region]"
    ],
    "examples": [
      "/setregion #InHouseQueue EUW"
    ]
  },
  {
    "name": "purge_user",
    "type": "Admin",
    "description": "Remove a member who has left the server from the database",
    "usage": [
      "/purge_user [userid]"
    ],
    "examples": [
      "/purge_user 12345678912312"
        ]
  },
  {
    "name": "purge_inactive",
    "type": "Admin",
    "description": "Purge anyone from the leaderboard with 0 wins, 0 losses, and 0 MVP points.",
    "usage": [
      "/purge_inactive"
    ],
    "examples": [
      "/purge_inactive"
        ]
  },
  {
    "name": "update_ign",
    "type": "Admin",
    "description": "Update the IGN of any player",
    "usage": [
      "/update_ign [ign] [member] [game]"
    ],
    "examples": [
      "/update_ign Faker John League of Legends"
    ]
  },
  {
    "name": "require",
    "type": "Admin",
    "description": "Set queue requirements based on the specified options",
    "usage": [
      "/require [condition] [game] [feature]"
    ],
    "examples": [
      "/require True League of Legends IGN",
      "/require True League of Legends Character Required"
    ]
  },
  {
    "name": "queue_role",
    "type": "Admin",
    "description": "Users must have this role before being able to queue",
    "usage": [
      "/queue_role [role] [game]"
    ],
    "examples": [
      "/queue_role @InHouseQueue League of Legends"
    ]
  },
  {
    "name": "fill",
    "type": "Admin",
    "description": "Enable Fill. Players queueing fill will be assigned a random available role",
    "usage": [
      "/fill [condition]"
    ],
    "examples": [
      "/fill True"
    ]
  },
  {
    "name": "casual",
    "type": "Admin",
    "description": "Enable Casual mode. No predefined roles, just 1 queue button for quick casual InHouse games",
    "usage": [
      "/casual [condition]"
    ],
    "examples": [
      "/casual True"
    ]
  },
  {
    "name": "force_start",
    "type": "Admin",
    "description": "Forces the game to start once the ready-up phase has begun",
    "usage": [
      "/force_start [gameid]",
    ],
    "examples": [
      "/force_start 03134ff5",
    ]
  },
  {
    "name": "schedule",
    "type": "Admin",
    "description": "Schedule when the queue opens and closes automatically (Timezones: UTC, EST, EDT)",
    "usage": [
      "/schedule",
    ],
    "examples": [
      "/schedule",
    ]
  },
  {
    "name": "delete_schedule",
    "type": "Admin",
    "description": "Delete a previously set schedule",
    "usage": [
      "/delete_schedule",
    ],
    "examples": [
      "/delete_schedule",
    ]
  },
  {
    "name": "feature",
    "type": "Admin",
    "description": "Toggle certain features",
    "usage": [
      "/feature [condition] [feature]",
    ],
    "examples": [
      "/feature True MVP Voting",
    ]
  },
  {
   "name": "captain_queue",
   "type": "Admin",
   "description": "Toggle Captain mode",
    "usage": [
      "/captain_queue [condition]",
    ],
    "examples": [
      "/captain_queue True",
    ]
  },
   {
    "name": "add_mmr",
    "type": "Admin",
    "description": "Increase a members MMR by an approximate percentage %",
     "usage": [
       "/add_mmr [member] [percentage]",
     ],
     "examples": [
       "/add_mmr @Faker 100",
     ]
  },
   {
    "name": "remove_mmr",
    "type": "Admin",
    "description": "Decrease a members MMR by an approximate percentage %",
     "usage": [
       "/remove_mmr [member] [percentage]",
     ],
     "examples": [
       "/remove_mmr @Faker 100",
     ]
   },
   {
     "name": "server_stats",
     "type": "Admin",
     "description": "Bring up your server statistics for the InHouseQueue bot!",
     "usage": [
       "/server_stats",
     ],
     "examples": [
       "/server_stats",
     ]
   },
  {
    "name": "check_permissions",
    "type": "Admin",
    "description": "Check and display enabled InHouseQueue permissions in a specific channel",
    "usage": [
      "/check_permissions [#channelname] (optional)",
    ],
    "examples": [
      "/check_permissions #general",
    ]
  },
  {
     "name": "add_lobby_info",
     "type": "Admin",
     "description": "Set/Update Lobby Instructions or details for players.",
     "usage": [
      "/add_lobby_info [title] [description]",
     ],
     "examples": [
       "/add_lobby_info Rules No toxicity in voice calls",
     ]
  },
  {
     "name": "set_timer",
     "type": "Admin",
     "description": "Update the Read up timer limit (Minutes)",
     "usage": [
      "/set_timer [minutes]",
     ],
     "examples": [
       "/set_timer 2",
     ]
  },
   {
     "name": "restrict_role",
     "type": "Admin",
     "description": "Assign a discord role for specific queue position",
     "usage": [
      "/restrict_role [discord_role] [queue_role]",
     ],
     "examples": [
       "/restrict_role @Healer healer",
     ]
  },
   {
     "name": "unrestrict_role",
     "type": "Admin",
     "description": "Removes the Discord role restriction from a designated queue position.",
     "usage": [
      "/unrestrict_role",
     ],
     "examples": [
       "/unrestrict_role [role]",
     ]
   },
    {
      "name": "language",
      "type": "Admin",
      "description": "Change the language of InHouseQueue",
      "usage": [
       "/language",
      ],
      "examples": [
          "/language Spanish",
      ]
    },
    {
      "name": "start_challenges",
      "type": "Admin",
      "description": "Initiate challenges in your server. Let the fun begin!",
      "usage": [
       "/start_challenges [game]",
      ],
      "examples": [
          "/start_challenges Custom",
      ]
    },
    {
      "name": "reset_challenges",
      "type": "Admin",
      "description": "Reset everyone's challenge progress.",
      "usage": [
       "/reset_challenges",
      ],
      "examples": [
          "/reset_challenges",
      ]
    },
    {
      "name": "pause_challenges",
      "type": "Admin",
      "description": "Pause the progression of challenges in your server",
      "usage": [
       "/pause_challenges",
      ],
      "examples": [
          "/pause_challenges",
      ]
    },
    {
      "name": "top_ten_preference",
      "type": "Admin",
      "description": "Determine how the Top10 leaderboard is Ranked",
      "usage": [
       "/top_ten_preference [pref]",
      ],
      "examples": [
          "/top_ten_preference MMR",
      ]
    },
     {
      "name": "captain_pick_type",
      "type": "Admin",
      "description": "Fully customize the captain pick system",
      "usage": [
       "/captain_pick_type",
      ],
      "examples": [
          "/captain_pick_type",
      ]
    },
     {
      "name": "coach",
      "type": "Admin",
      "description": "Designate a role for a Coach. Coaches can speak in voice lobbies",
      "usage": [
       "/coach [role]",
      ],
      "examples": [
          "/coach @Coach",
      ]
    },
    {
      "name": "set_queue_mode",
      "type": "Admin",
      "description": "Lock a queue to a specific game mode",
      "usage": [
       "/set_queue_mode [channel] [gamemode]",
      ],
      "examples": [
          "/set_queue_mode #queue MMR Queue",
      ]
    },
    {
      "name": "unset_queue_mode",
      "type": "Admin",
      "description": "Remove specific game mode lock from a queue channel",
      "usage": [
       "/unset_queue_mode [channel]",
      ],
      "examples": [
          "/unset_queue_mode #queue",
      ]
    },
    {
      "name": "unsubscribe",
      "type": "Admin",
      "description": "Unsubscribe from InHouseQueue reminders and notifications",
      "usage": [
       "/unsubscribe [feature]",
      ],
      "examples": [
          "/unsubscribe Tips",
      ]
    },
    {
      "name": "set_voice",
      "type": "Admin",
      "description": "Set a Voice channel to Auto-moves players to/from team channels",
      "usage": [
       "/set_voice [voice]",
      ],
      "examples": [
          "/set_voice General",
      ]
    },
    {
      "name": "rolling_queue",
      "type": "Admin",
      "description": "Toggle rolling queue",
      "usage": [
       "/rolling_queue [preference]",
      ],
      "examples": [
          "/rolling_queue Enabled",
      ]
    },
   {
     "name": "maps",
     "type": "Admin",
     "description": "Enable maps for a Specific game",
     "usage": [
      "/maps [map_selection] [game]",
     ],
     "examples": [
         "/maps Random Custom",
     ]
   },
   {
     "name": "add_map",
     "type": "Admin",
     "description": "Add a map to your server map pool",
     "usage": [
      "/add_map [name] (game_mode) [image_url] [game]",
     ],
     "examples": [
         "/add_map Rust Domination https://i.imgur/abcdef.jpg Custom",
     ]
   },
   {
     "name": "disable_maps",
     "type": "Admin",
     "description": "Disable the map feature",
     "usage": [
      "/disable_maps [game]",
     ],
     "examples": [
         "/disable_maps Custom",
     ]
   },
   {
     "name": "remove_map",
     "type": "Admin",
     "description": "Remove a map",
     "usage": [
      "/remove_map [map_name]",
     ],
     "examples": [
         "/remove_map Rust",
     ]
   },
    {
      "name": "show_mmr",
      "type": "Admin",
      "description": "Show players MMR next to their names in the queue",
      "usage": [
       "/show_mrr [preference]",
      ],
      "examples": [
          "/show_mmr Enabled",
      ]
    },
    {
      "name": "starting_mmr",
      "type": "Admin",
      "description": "Adjust a players starting MMR",
      "usage": [
       "/starting_mmr [player] [mmr] [game]",
      ],
      "examples": [
          "/starting_mmr @Faker ~4000 League of Legends",
      ]
    },
    {
      "name": "sub",
      "type": "Admin",
      "description": "Substitutes one player for another in an in-progress game.",
      "usage": [
       "/sub [player_1] [player_2] [gameid]",
      ],
      "examples": [
          "/sub @Faker @Peanut 1c44c992",
      ]
    },
    {
      "name": "set_timeout",
      "type": "Admin",
      "description": "Sets the queue inactivity timeout for the server.",
      "usage": [
       "/set_timeout [hour]",
      ],
      "examples": [
          "/set_timeout 1Hour",
      ]
    },
    {
      "name": "create_draft",
      "type": "Admin",
      "description": "Create a fresh draft link for a game (Lol only).",
      "usage": [
       "/create_draft [gameid]",
      ],
      "examples": [
          "/create_draft d3441a8c",
      ]
    },

  // ~ Set-up
  {
    "name": "setup",
    "type": "Set-Up",
    "description": "Setup your server Automatically!",
    "usage": [
      "/setup [game]"
    ],
    "examples": [
      "/setup Overwatch"
    ]
  },
  {
    "name": "setchannel",
    "type": "Set-Up",
    "description": "Set queue channel. You may set as many queue channels as you require.",
    "usage": [
      "/setchannel [#channelname] [game]"
    ],
    "examples": [
      "/setchannel #InHouseQueue Valorant"
    ]
  },
  {
    "name": "setwinnerlog",
    "type": "Set-Up",
    "description": "Game results are sent to this channel. You may only have 1 match history channel per server.",
    "usage": [
      "/setwinnerlog [#channelname] [game]"
    ],
    "examples": [
      "/setwinnerlog #match-history Valorant"
    ]
  },
  {
    "name": "top_ten",
    "type": "Set-Up",
    "description": "Set up a Dynamic top ten leaderboard",
    "usage": [
      "/top_ten [#channelname] [game]"
    ],
    "examples": [
      "/top_ten #leaderboard Overwatch"
    ]
  },
  {
    "name": "test_mode",
    "type": "Set-Up",
    "description": "Toggle Test mode",
    "usage": [
      "/test_mode [options]"
    ],
    "examples": [
      "/test_mode True"
    ]
  },

  // ~ General
  {
    "name": "help",
    "type": "General",
    "description": "Display help menu.",
    "usage": [
      "/help"
    ],
    "examples": []
  },
  {
    "name": "start",
    "type": "General",
    "description": "Start an InHouse queue. This command can only be run in a queue channel.",
    "usage": [
      "/start"
    ],
    "examples": []
  },
  {
    "name": "win",
    "type": "General",
    "description": "Initiate the winner vote. This command can only be run in a lobby channel.",
    "usage": [
      "/win"
    ],
    "examples": []
  },
  {
    "name": "leaderboard",
    "type": "General",
    "description": "Display a specific leaderboard.",
    "usage": [
      "/leaderboard_[game] [options]"
    ],
    "examples": [
      "/leaderboard_lol mmr",
      "/leaderboard_lol mvp",
      "/leaderboard_lol"
    ]
  },
  {
    "name": "rank",
    "type": "General",
    "description": "Display a player's rank in the server.",
    "usage": [
      "/rank_[game] [user]"
    ],
    "examples": [
      "/rank_lol Faker"
    ]
  },
  {
    "name": "ign",
    "type": "General",
    "description": "Set your In Game Name",
    "usage": [
      "/ign [ign] [game]"
    ],
    "examples": [
      "/ign Faker League of Legends"
    ]
  },
  {
    "name": "abandon",
    "type": "General",
    "description": "Initiate a vote to cancel an ongoing game",
    "usage": [
      "/abandon",
    ],
    "examples": [
      "/abandon",
    ]
  },
  {
    "name": "challenges",
    "type": "General",
    "description": "View all challenges available for InHouseQueue. Free and Premium.",
    "usage": [
      "/challenges",
    ],
    "examples": [
      "/challenges",
    ]
  },
  {
    "name": "my_challenges",
    "type": "General",
    "description": "View your challenge progress",
    "usage": [
      "/my_challenges",
    ],
    "examples": [
      "/my_challenges",
    ]
  },
  {
    "name": "refresh_challenges",
    "type": "General",
    "description": "Refresh your challenges incase they did not update",
    "usage": [
      "/refresh_challenges",
    ],
    "examples": [
      "/refresh_challenges",
    ]
  },
  {
    "name": "list_maps",
    "type": "General",
    "description": "List all maps available on the server",
    "usage": [
      "/list_maps",
    ],
    "examples": [
      "/list_maps",
    ]
  },
  // ~ Games
//   {
//     "name": "champion",
//     "type": "LoL",
//     "description": "Select your champion. Only works inside a lobby channel",
//     "usage": [
//       "/champion [name]",
//     ],
//     "examples": [
//       "/champion Teemo",
//     ]
//   },

  // ~ Premium
  {
    "name": "set_status",
    "type": "Premium",
    "description": "Set the Activity of your Bot. (Tier 3 only)",
    "usage": [
      "/set_status [status]",
    ],
    "examples": [
      "/set_status Just chilling",
    ]
  },
  {
    "name": "update_banner ",
    "type": "Premium",
    "description": "Update the Queue Banner image",
    "usage": [
      "/update_banner [url]",
    ],
    "examples": [
      "/update_banner https://i.imgur.com/123123lhasd",
    ]
  },
  {
    "name": "update_color ",
    "type": "Premium",
    "description": "Update the color of your Queue embed (Hexcode only)",
    "usage": [
      "/update_color [color]",
    ],
    "examples": [
      "/update_color #000000",
    ]
  },
  {
    "name": "rename_teams ",
    "type": "Premium",
    "description": "Rename team names to replace 'Blue' & 'Red'",
    "usage": [
      "/rename_teams [blue] [red] [queue_channel]",
    ],
    "examples": [
      "/rename_teams Team eSports Team Gaming #queue",
    ]
  },
  {
    "name": "list_teams ",
    "type": "Premium",
    "description": "View the all team names for your server.",
    "usage": [
      "/list_teams",
    ],
    "examples": [
      "/list_teams",
    ]
  },
  {
    "name": "ready_penalty",
    "type": "Premium",
    "description": "Award timed queue bans for players who don't ready up",
    "usage": [
      "/ready_penalty [preference] (duration_1) (duration_2) (duration_3)",
    ],
    "examples": [
      "/ready_penalty True 5minutes 30minutes 60minutes",
    ]
  },
  {
    "name": "reset_server_penalties ",
    "type": "Premium",
    "description": "Remove all queue bans from the server",
    "usage": [
      "/reset_server_penalties",
    ],
    "examples": [
      "reset_server_penalties",
    ]
  },
  {
    "name": "reset_user_penalty ",
    "type": "Premium",
    "description": "Remove all queue bans from a Member",
    "usage": [
      "/reset_user_penalty [member]",
    ],
    "examples": [
      "/reset_user_penalty @Faker",
    ]
  },
  {
    "name": "best_of_series",
    "type": "Premium",
    "description": "Toggle the best of series 3 or 5 feature.",
    "usage": [
     "/best_of_series [preference] [channel] [series_type]",
    ],
    "examples": [
        "/best_of_series True #queue 5",
    ]
  },
//   {
//     "name": "hero",
//     "type": "Overwatch",
//     "description": "Select your hero. Only works inside a lobby channel",
//     "usage": [
//       "/hero [name]",
//     ],
//     "examples": [
//       "/hero Tracer",
//     ]
//   },
//   {
//     "name": "agent",
//     "type": "Valorant",
//     "description": "Select your agent. Only works inside a lobby channel",
//     "usage": [
//       "/agent [name]",
//     ],
//     "examples": [
//       "/agent Astra",
//     ]
//   }
// removing these for now - leaving as an example in case i ever add game specific commands
// full search for "League of Legends commands" in this repo
] as const;

// export commands
export default commands;

// types
export type Command = typeof commands[number];
