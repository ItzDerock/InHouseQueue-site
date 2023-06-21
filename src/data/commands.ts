// edit this object to add/remove commands
const commands = [
  // ~ Admin
  {
    "name": "reset",
    "type": "Admin",
    "description": "Reset scores of an individual or the entire server. Remove everyone from a queue.",
    "usage": [
      "/admin reset leaderboard",
      "/admin reset user [member]",
      "/admin reset queue [gameid]"
    ],
    "examples": [
      "/admin reset leaderboard",
      "/admin reset user @John",
      "/admin reset queue 03134ff5"
    ]
  },
  {
    "name": "void",
    "type": "Admin",
    "description": "Purge all records of a game. Used if players get \"stuck\" in a match and cannot queue.",
    "usage": [
      "/admin void [gameid]"
    ],
    "examples": [
      "/admin void 03134ff5"
    ]
  },
  {
    "name": "change_winner",
    "type": "Admin",
    "description": "Change the results of a finished game.",
    "usage": [
      "/admin change_winner [gameid] [team]"
    ],
    "examples": [
      "/admin change_winner 03134ff5 Red"
    ]
  },
  {
    "name": "winner",
    "type": "Admin",
    "description": "Set a winner for an ongoing game without requiring a vote.",
    "usage": [
      "/admin winner [role]"
    ],
    "examples": [
      "/admin winner @Red: 316d8cc7"
    ]
  },
  {
    "name": "queue_preference",
    "type": "Admin",
    "description": "Decide if players can be in multiple queues at once.",
    "usage": [
      "/admin queue_preference [options] "
    ],
    "examples": [
      "/admin queue_preference Single Queue"
    ]
  },
  {
    "name": "sbmm",
    "type": "Admin",
    "description": "Enable/Disable Skill",
    "usage": [
      "/admin sbmm [options]"
    ],
    "examples": [
      "/admin sbmm Disable"
    ]
  },
  {
    "name": "cancel",
    "type": "Admin",
    "description": "Cancel an ongoing match",
    "usage": [
      "/admin cancel [gameid]"
    ],
    "examples": [
      "/admin cancel 03134ff5"
    ]
  },
  {
    "name": "grant",
    "type": "Admin",
    "description": "Give a Discord role the permissions to run a specific admin command",
    "usage": [
      "/admin grant [role] [command]"
    ],
    "examples": [
      "/admin grant @Moderators queue reset"
    ]
  },
  {
    "name": "revoke",
    "type": "Admin",
    "description": "Remove the admin command from a discord role you previously set",
    "usage": [
      "/admin revoke [role] [command]"
    ],
    "examples": [
      "/admin revoke @Moderators queue reset"
    ]
  },
  {
    "name": "user_dequeue",
    "type": "Admin",
    "description": "Remove single user from an ongoing queue",
    "usage": [
      "/admin user_dequeue [member]"
    ],
    "examples": [
      "/admin user_dequeue @John"
    ]
  },
  {
    "name": "duo_queue",
    "type": "Admin",
    "description": "Enable/Disable Duo queuing",
    "usage": [
      "/admin duo_queue [options]"
    ],
    "examples": [
      "/admin duo_queue Enable"
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
    "name": "reset_db",
    "type": "Admin",
    "description": "Remove a member who has left the server from the database",
    "usage": [
      "/admin reset_db [userid]"
    ],
    "examples": [
      "/admin reset_db 12345678912312"
        ]
  },
  {
    "name": "update_ign",
    "type": "Admin",
    "description": "Update the IGN of any player",
    "usage": [
      "/admin update_ign [ign] [member] [game]"
    ],
    "examples": [
      "/admin update_ign Faker John League of Legends"
    ]
  },
  {
    "name": "require",
    "type": "Admin",
    "description": "Set queue requirements based on the specified options",
    "usage": [
      "/admin require [condition] [game] [feature]"
    ],
    "examples": [
      "/admin require True League of Legends IGN",
      "/admin require True League of Legends Character Required"
    ]
  },
  {
    "name": "update_character",
    "type": "Admin",
    "description": "Add/update the champion, hero or agent a member has played",
    "usage": [
      "/admin update_character [name] [gameid] [member] [game]"
    ],
    "examples": [
      "/admin update_character Teemo 03134ff5 @iHenners League of Legends"
    ]
  },
  {
    "name": "queue_role",
    "type": "Admin",
    "description": "Users must have this role before being able to queue",
    "usage": [
      "/admin queue_role [role] [game]"
    ],
    "examples": [
      "/admin queue_role @InHouseQueue League of Legends"
    ]
  },
  {
    "name": "fill",
    "type": "Admin",
    "description": "Enable Fill. Players queueing fill will be assigned a random available role",
    "usage": [
      "/admin fill [condition]"
    ],
    "examples": [
      "/admin fill True"
    ]
  },
  {
    "name": "casual",
    "type": "Admin",
    "description": "Enable Casual mode. No predefined roles, just 1 queue button for quick casual InHouse games",
    "usage": [
      "/admin casual [condition]"
    ],
    "examples": [
      "/admin casual True"
    ]
  },
  {
    "name": "force_start",
    "type": "Admin",
    "description": "Forces the game to start once the ready-up phase has begun",
    "usage": [
      "/admin force_start [gameid]",
    ],
    "examples": [
      "/admin force_start 03134ff5",
    ]
  },
  {
    "name": "schedule",
    "type": "Admin",
    "description": "Schedule when the queue opens and closes automatically (Timezones: UTC, EST, EDT)",
    "usage": [
      "/admin schedule",
    ],
    "examples": [
      "/admin schedule",
    ]
  },
  {
    "name": "delete_schedule",
    "type": "Admin",
    "description": "Delete a previously set schedule",
    "usage": [
      "/admin delete_schedule",
    ],
    "examples": [
      "/admin delete_schedule",
    ]
  },
  {
    "name": "feature",
    "type": "Admin",
    "description": "Enable/Disable certain features",
    "usage": [
      "/admin feature [condition] [feature]",
    ],
    "examples": [
      "/admin feature True MVP Voting",
    ]
  },

  // ~ Set-up
  {
    "name": "setup",
    "type": "Set-Up",
    "description": "Setup your server Automatically!",
    "usage": [
      "/admin setup [game]"
    ],
    "examples": [
      "/admin setup Overwatch"
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
      "/admin top_ten [#channelname] [game]"
    ],
    "examples": [
      "/admin top_ten #leaderboard Overwatch"
    ]
  },
  {
    "name": "test_mode",
    "type": "Set-Up",
    "description": "Enable/Disable Test mode",
    "usage": [
      "/admin test_mode [options]"
    ],
    "examples": [
      "/admin test_mode True"
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
    "name": "champion",
    "type": "General",
    "description": "Select your champion. Only works inside a lobby channel",
    "usage": [
      "/champion [name]",
    ],
    "examples": [
      "/champion Teemo",
    ]
  },
  {
    "name": "hero",
    "type": "General",
    "description": "Select your hero. Only works inside a lobby channel",
    "usage": [
      "/hero [name]",
    ],
    "examples": [
      "/hero Tracer",
    ]
  },
  {
    "name": "agent",
    "type": "General",
    "description": "Select your agent. Only works inside a lobby channel",
    "usage": [
      "/agent [name]",
    ],
    "examples": [
      "/agent Astra",
    ]
  },
  {
    "name": "top",
    "type": "General",
    "description": "View players with the highest win rates on a particular character",
    "usage": [
      "/top [game] [name]",
    ],
    "examples": [
      "/top League of Legends Thresh",
    ]
  },
  {
    "name": "server_stats",
    "type": "General",
    "description": "Bring up your server statistics for the InHouseQueue bot!",
    "usage": [
      "/server stats",
    ],
    "examples": [
      "/server stats",
    ]
  },

  // ~ Games
  {
    "name": "champion",
    "type": "LoL",
    "description": "Select your champion. Only works inside a lobby channel",
    "usage": [
      "/champion [name]",
    ],
    "examples": [
      "/champion Teemo",
    ]
  },
  {
    "name": "hero",
    "type": "Overwatch",
    "description": "Select your hero. Only works inside a lobby channel",
    "usage": [
      "/hero [name]",
    ],
    "examples": [
      "/hero Tracer",
    ]
  },
  {
    "name": "agent",
    "type": "Valorant",
    "description": "Select your agent. Only works inside a lobby channel",
    "usage": [
      "/agent [name]",
    ],
    "examples": [
      "/agent Astra",
    ]
  }
] as const;

// export commands
export default commands;

// types
export type Command = typeof commands[number];
