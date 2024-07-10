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
    "name": "queue join_limit",
    "type": "Admin",
    "description": "Decide if players can be in multiple queues at once.",
    "usage": [
      "/queue join_limit [options] "
    ],
    "examples": [
      "/queue join_limit Single Queue"
    ]
  },
  {
    "name": "mmr toggle",
    "type": "Admin",
    "description": "Toggle Skill-Based matchmaking",
    "usage": [
      "/mmr toggle [options]"
    ],
    "examples": [
      "/mmr toggle Disable"
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
      "/grant queue_commands [role] [command]",
      "/grant server_commands [role] [command]",
      "/grant game_commands [role] [command]",
      "/grant leaderboard_commands [role] [command]"
    ],
    "examples": [
      "/grant queue_commands @Moderators Reset a queue"
    ]
  },
  {
    "name": "revoke",
    "type": "Admin",
    "description": "Remove the admin command from a discord role you previously set",
    "usage": [
      "/revoke queue_commands [role] [command]",
      "/revoke server_commands [role] [command]",
      "/revoke game_commands [role] [command]",
      "/revoke leaderboard [role] [command]"
    ],
    "examples": [
      "/revoke queue_commands @Moderators Reset a queue"
    ]
  },
  {
    "name": "user dequeue",
    "type": "Admin",
    "description": "Remove single user from an ongoing queue",
    "usage": [
      "/user dequeue [member]"
    ],
    "examples": [
      "/user dequeue @John"
    ]
  },
  {
    "name": "queue duo",
    "type": "Admin",
    "description": "Toggle Duo queuing",
    "usage": [
      "/queue duo [options]"
    ],
    "examples": [
      "/queue duo Enable"
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
    "name": "purge user",
    "type": "Admin",
    "description": "Remove a member who has left the server from the database",
    "usage": [
      "/purge user [userid]"
    ],
    "examples": [
      "/purge user 12345678912312"
        ]
  },
  {
    "name": "purge inactive",
    "type": "Admin",
    "description": "Purge anyone from the leaderboard with 0 wins, 0 losses, and 0 MVP points.",
    "usage": [
      "/purge inactive"
    ],
    "examples": [
      "/purge inactive"
        ]
  },
  {
    "name": "user update_ign",
    "type": "Admin",
    "description": "Update the IGN of any player",
    "usage": [
      "/user update_ign [ign] [member] [game]"
    ],
    "examples": [
      "/user update_ign Faker John League of Legends"
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
    ]
  },
  {
    "name": "queue rol",
    "type": "Admin",
    "description": "Users must have this role before being able to queue",
    "usage": [
      "/queue role [role] [game]"
    ],
    "examples": [
      "/queue role @InHouseQueue League of Legends"
    ]
  },
  {
    "name": "queue fill",
    "type": "Admin",
    "description": "Enable Fill. Players queueing fill will be assigned a random available role",
    "usage": [
      "/queue fill [condition]"
    ],
    "examples": [
      "/queue fill True"
    ]
  },
  {
    "name": "queue casual",
    "type": "Admin",
    "description": "Enable Casual mode. No predefined roles, just 1 queue button for quick casual InHouse games",
    "usage": [
      "/queue casual [condition]"
    ],
    "examples": [
      "/queue casual True"
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
    "name": "queue schedule",
    "type": "Admin",
    "description": "Schedule when the queue opens and closes automatically (Timezones: UTC, EST, EDT)",
    "usage": [
      "/queue schedule",
    ],
    "examples": [
      "/queue schedule",
    ]
  },
  {
    "name": "queue delete_schedule",
    "type": "Admin",
    "description": "Delete a previously set schedule",
    "usage": [
      "/queue delete_schedule",
    ],
    "examples": [
      "/queue delete_schedule",
    ]
  },
  {
    "name": "defaults mvp_voting",
    "type": "Admin",
    "description": "Toggle MVP Voting",
    "usage": [
      "/defaults mvp_voting [condition]",
    ],
    "examples": [
      "/defaults mvp_voting True",
    ]
  },
  {
    "name": "defaults opgg",
    "type": "Admin",
    "description": "Toggle Automatic op.gg link (LoL only)",
    "usage": [
      "/defaults opgg [condition]",
    ],
    "examples": [
      "/defaults opgg True",
    ]
  },
  {
    "name": "defaults lol_draft",
    "type": "Admin",
    "description": "Toggle LoL draft link (LoL only)",
    "usage": [
      "/defaults lol_draft [condition]"
    ],
    "examples": [
      "/defaults lol_draft True"
    ]
  },
  {
    "name": "voice create_vc",
    "type": "Admin",
    "description": "Toggle Voice channel creation",
    "usage": [
      "/voice create_vc [condition]"
    ],
    "examples": [
      "/voice create_vc True"
    ]
  },
  {
    "name": "defaults show_lobby",
    "type": "Admin",
    "description": "Limit the game lobby visibility",
    "usage": [
      "/defaults show_lobby [condition]"
    ],
    "examples": [
      "/defaults show_lobby True"
    ]
  },
  {
    "name": "defaults queue_role",
    "type": "Admin",
    "description": "Toggle requiring the queue role",
    "usage": [
      "/defaults queue_role [condition]"
    ],
    "examples": [
      "/defaults queue_role True"
    ]
  },
  {
    "name": "defaults match_info",
    "type": "Admin",
    "description": "Toggle Match Information sent in the lobby",
    "usage": [
      "/defaults match_info [condition]"
    ],
    "examples": [
      "/defaults match_info True"
    ]
  },
  {
    "name": "defaults mute_spectators",
    "type": "Admin",
    "description": "Toggle Mute spectators in VC",
    "usage": [
      "/defaults mute_spectators [condition]"
    ],
    "examples": [
      "/defaults mute_spectators True"
    ]
  },
  {
    "name": "defaults send_ready_up_dm",
    "type": "Admin",
    "description": "Specify if the bot will DM players when a game is found",
    "usage": [
      "/defaults send_ready_up_dm [condition]"
    ],
    "examples": [
      "/defaults send_ready_up_dm True"
    ]
  },
  {
   "name": "captain queue",
   "type": "Admin",
   "description": "Toggle Captain mode",
    "usage": [
      "/captain queue [condition]",
    ],
    "examples": [
      "/captain queue True",
    ]
  },
   {
    "name": "mmr add",
    "type": "Admin",
    "description": "Increase a members MMR by an approximate percentage %",
     "usage": [
       "/mmr add [member] [percentage]",
     ],
     "examples": [
       "/mmr add @Faker 100",
     ]
  },
   {
    "name": "mmr remove",
    "type": "Admin",
    "description": "Decrease a members MMR by an approximate percentage %",
     "usage": [
       "/mmr remove [member] [percentage]",
     ],
     "examples": [
       "/mmr remove @Faker 100",
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
     "name": "lobby add_info",
     "type": "Admin",
     "description": "Set/Update Lobby Instructions or details for players.",
     "usage": [
      "/lobby add_info [title] [description]",
     ],
     "examples": [
       "/lobby add_info Rules No toxicity in voice calls",
     ]
  },
  {
     "name": "queue ready_timeout",
     "type": "Admin",
     "description": "Update the Read up timer limit (Minutes)",
     "usage": [
      "/queue ready_timeout [minutes]",
     ],
     "examples": [
       "/queue ready_timeout 2",
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
      "name": "challenges start",
      "type": "Admin",
      "description": "Initiate challenges in your server. Let the fun begin!",
      "usage": [
       "/challenges start [game]",
      ],
      "examples": [
          "/challenges start Custom",
      ]
    },
    {
      "name": "reset challenges",
      "type": "Admin",
      "description": "Reset everyone's challenge progress.",
      "usage": [
       "/reset challenges",
      ],
      "examples": [
          "/reset challenges",
      ]
    },
    {
      "name": "challenges pause",
      "type": "Admin",
      "description": "Pause the progression of challenges in your server",
      "usage": [
       "/challenges pause",
      ],
      "examples": [
          "/challenges pause",
      ]
    },
    {
      "name": "leaderboard top_ten_order",
      "type": "Admin",
      "description": "Determine how the Top10 leaderboard is Ranked",
      "usage": [
       "/leaderboard top_ten_order [pref]",
      ],
      "examples": [
          "/leaderboard top_ten_order MMR",
      ]
    },
     {
      "name": "captain pick_order",
      "type": "Admin",
      "description": "Fully customize the captain pick system",
      "usage": [
       "/captain pick_order",
      ],
      "examples": [
          "/captain pick_order",
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
      "name": "queue mode",
      "type": "Admin",
      "description": "Lock a queue to a specific game mode",
      "usage": [
       "/queue mode [channel] [gamemode]",
      ],
      "examples": [
          "/queue mode #queue MMR Queue",
      ]
    },
    {
      "name": "queue clear_mode",
      "type": "Admin",
      "description": "Remove specific game mode lock from a queue channel",
      "usage": [
       "/queue clear_mode [channel]",
      ],
      "examples": [
          "/queue clear_mode #queue",
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
      "name": "voice set",
      "type": "Admin",
      "description": "Set a Voice channel to Auto-moves players to/from team channels",
      "usage": [
       "/voice set [voice]",
      ],
      "examples": [
          "/voice set General",
      ]
    },
   {
     "name": "maps enable",
     "type": "Admin",
     "description": "Enable maps for a Specific game",
     "usage": [
      "/maps enable [map_selection] [game]",
     ],
     "examples": [
         "/maps enable Random Custom",
     ]
   },
   {
     "name": "maps add",
     "type": "Admin",
     "description": "Add a map to your server map pool",
     "usage": [
      "/maps add [name] (game_mode) [image_url] [game]",
     ],
     "examples": [
         "/maps add Rust Domination https://i.imgur/abcdef.jpg Custom",
     ]
   },
   {
     "name": "maps disable",
     "type": "Admin",
     "description": "Disable the map feature",
     "usage": [
      "/maps disable [game]",
     ],
     "examples": [
         "/maps disable Custom",
     ]
   },
   {
     "name": "maps remove",
     "type": "Admin",
     "description": "Remove a map",
     "usage": [
      "/maps remove [map_name]",
     ],
     "examples": [
         "/maps remove Rust",
     ]
   },
    {
      "name": "mmr show",
      "type": "Admin",
      "description": "Show players MMR next to their names in the queue",
      "usage": [
       "/mmr show [preference]",
      ],
      "examples": [
          "/mmr show Enabled",
      ]
    },
    {
      "name": "mmr set_starting",
      "type": "Admin",
      "description": "Adjust a players starting MMR",
      "usage": [
       "/mmr set_starting [player] [mmr] [game]",
      ],
      "examples": [
          "/mmr set_starting @Faker ~4000 League of Legends",
      ]
    },
    {
      "name": "game sub",
      "type": "Admin",
      "description": "Substitutes one player for another in an in-progress game.",
      "usage": [
       "/game sub [player_1] [player_2] [gameid]",
      ],
      "examples": [
          "/game sub @Faker @Peanut 1c44c992",
      ]
    },
    {
      "name": "queue timeout",
      "type": "Admin",
      "description": "Sets the queue inactivity timeout for the server.",
      "usage": [
       "/queue timeout [hour]",
      ],
      "examples": [
          "/queue timeout 1Hour",
      ]
    },
    {
      "name": "game create_draft",
      "type": "Admin",
      "description": "Create a fresh draft link for a game (Lol only).",
      "usage": [
       "/game create_draft [gameid]",
      ],
      "examples": [
          "/game create_draft d3441a8c",
      ]
    },
    {
      "name": "season start",
      "type": "Admin",
      "description": "Start a new season in the server.",
      "usage": [
        "/season start [days] [game] [channel] [season_name] [role]"
      ],
      "examples": [
        "/season start 30 Valorant #announcements Spring_Split @season_role"
      ]
    },
    {
      "name": "season extend",
      "type": "Admin",
      "description": "Extend the current season.",
      "usage": [
        "/season extend [game] [days]"
      ],
      "examples": [
        "/season extend Valorant 10"
      ]
    },
    {
      "name": "season shorten",
      "type": "Admin",
      "description": "Shorten the current season.",
      "usage": [
        "/season shorten [game] [days]"
      ],
      "examples": [
        "/season shorten Overwatch 5"
      ]
    },
    {
      "name": "season end",
      "type": "Admin",
      "description": "End the current season early.",
      "usage": [
        "/season end [game]"
      ],
      "examples": [
        "/season end League Of Legends"
      ]
    },
    {
      "name": "season stats",
      "type": "Admin",
      "description": "View the current season stats.",
      "usage": [
        "/season stats [game]"
      ],
      "examples": [
        "/season stats Custom"
      ]
    },
    {
      "name": "captain first_pick",
      "type": "Admin",
      "description": "Set what captain picks first",
      "usage": [
        "/captain first_pick [first_pick]"
      ],
      "examples": [
        "/captain first_pick Blue side"
      ]
    },
    {
      "name": "all_time_leaderboard",
      "type": "Admin",
      "description": "Create and manage a dynamic, persistent leaderboard that tracks the lifetime performance of players based on total wins.",
      "usage": [
        "/all_time_leaderboard [channel] [game]"
      ],
      "examples": [
        "/all_time_leaderboard #leaderboard_channel League Of Legends"
      ]
    },
    {
      "name": "user add_win",
      "type": "Admin",
      "description": "Add a specified number of wins to a user.",
      "usage": [
        "/user add_win [member] [amount] [game]"
      ],
      "examples": [
        "/user add_win @player 5 League Of Legends"
      ]
    },
    {
      "name": "user add_loss",
      "type": "Admin",
      "description": "Add a specified number of losses to a user.",
      "usage": [
        "/user add_loss [member] [amount] [game]"
      ],
      "examples": [
        "/user add_loss @player 5 League Of Legends"
      ]
    },
    {
      "name": "user remove_win",
      "type": "Admin",
      "description": "Remove a specified number of wins from a user.",
      "usage": [
        "/user remove_win [member] [amount] [game]"
      ],
      "examples": [
        "/user remove_win @player 5 League Of Legends"
      ]
    },
    {
      "name": "user remove_loss",
      "type": "Admin",
      "description": "Remove a specified number of losses from a user.",
      "usage": [
        "/user remove_loss [member] [amount] [game]"
      ],
      "examples": [
        "/user remove_loss @player 5 League Of Legends"
      ]
    },
    {
      "name": "queue duo_mmr_limit",
      "type": "Admin",
      "description": "Set the MMR threshold for the duo queue in a specific channel.",
      "usage": [
        "/queue duo_mmr_limit [mmr_value] [queue_channel]"
      ],
      "examples": [
        "/queue duo_mmr_limit 1500 #queue",
        "/queue duo_mmr_limit 2000 #queue"
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
  {
    "name": "server logs",
    "type": "Set-Up",
    "description": "Create a log channel",
    "usage": [
      "/server logs [channel]"
    ],
    "examples": [
      "/server logs #admin-log-channel"
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
      "/leaderboard [game] [options]"
    ],
    "examples": [
      "/leaderboard lol mmr",
      "/leaderboard lol mvp",
      "/leaderboard lol"
    ]
  },
  {
    "name": "rank",
    "type": "General",
    "description": "Display a player's rank in the server.",
    "usage": [
      "/rank [game] [user]"
    ],
    "examples": [
      "/rank lol Faker"
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
    "name": "challenges all",
    "type": "General",
    "description": "View all challenges available for InHouseQueue. Free and Premium.",
    "usage": [
      "/challenges all",
    ],
    "examples": [
      "/challenges all",
    ]
  },
  {
    "name": "challenges personal",
    "type": "General",
    "description": "View your challenge progress",
    "usage": [
      "/challenges show_all",
    ],
    "examples": [
      "/challenges show_all",
    ]
  },
  {
    "name": "challenges refresh",
    "type": "General",
    "description": "Refresh your challenges incase they did not update",
    "usage": [
      "/challenges refresh",
    ],
    "examples": [
      "/challenges refresh",
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
  {
    "name": "match_history",
    "type": "General",
    "description": "View a players Match History",
    "usage": [
      "/match_history [game] [member]",
    ],
    "examples": [
      "/match_history Custom @Faker",
    ]
  },
  {
    "name": "stats",
    "type": "General",
    "description": "View a players Stats",
    "usage": [
      "/stats [game] [member]",
    ],
    "examples": [
      "/stats Custom @Faker",
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
    "name": "premium set_status",
    "type": "Premium",
    "description": "Set the Activity of your Bot. (Tier 3 only)",
    "usage": [
      "/premium set_status [status]",
    ],
    "examples": [
      "/premium set_status Just chilling",
    ]
  },
  {
    "name": "premium update_banner",
    "type": "Premium",
    "description": "Update the Queue Banner image",
    "usage": [
      "/premium update_banner [url]",
    ],
    "examples": [
      "/premium update_banner https://i.imgur.com/123123lhasd",
    ]
  },
  {
    "name": "premium update_color ",
    "type": "Premium",
    "description": "Update the color of your Queue embed (Hexcode only)",
    "usage": [
      "/premium update_color [color]",
    ],
    "examples": [
      "/premium update_color #000000",
    ]
  },
  {
    "name": "premium rename_teams ",
    "type": "Premium",
    "description": "Rename team names to replace 'Blue' & 'Red'",
    "usage": [
      "/premium rename_teams [blue] [red] [queue_channel]",
    ],
    "examples": [
      "/premium rename_teams Team eSports Team Gaming #queue",
    ]
  },
  {
    "name": "premium list_teams ",
    "type": "Premium",
    "description": "View the all team names for your server.",
    "usage": [
      "/premium list_teams",
    ],
    "examples": [
      "/premium list_teams",
    ]
  },
  {
    "name": "premium ready_penalty",
    "type": "Premium",
    "description": "Award timed queue bans for players who don't ready up",
    "usage": [
      "/premium ready_penalty [preference] (duration_1) (duration_2) (duration_3)",
    ],
    "examples": [
      "/premium ready_penalty True 5minutes 30minutes 60minutes",
    ]
  },
  {
    "name": "premium reset_server_penalties",
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
    "name": "premium reset_user_penalty ",
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
    "name": "premium best_of_series",
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
