// edit this object to add/remove commands
const commands = [
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
    "name": "enable",
    "type": "Admin",
    "description": "Give a Discord role the permissions to run a specific admin command",
    "usage": [
      "/admin enable [role] [command]"
    ],
    "examples": [
      "/admin enable @Moderators queue reset"
    ]
  },
  {
    "name": "disable",
    "type": "Admin",
    "description": "Remove the admin command from a discord role you previously set",
    "usage": [
      "/admin disable [role] [command]"
    ],
    "examples": [
      "/admin disable @Moderators queue reset"
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
    "description": "Update the region of an existing channel.",
    "usage": [
      "/setregion [#channelname] [region]"
    ],
    "examples": [
      "/setregion #InHouseQueue EUW"
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
    "description": "Display your rank in the server.",
    "usage": [
      "/rank_[game] [options]"
    ],
    "examples": [
      "/rank_valorant mmr",
      "/rank_valorant mvp"
    ]
  },
] as const;

// export commands
export default commands;

// types
export type Command = typeof commands[number];