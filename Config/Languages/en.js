const { bold, italic, channelMention } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  bot: {
    commands: {
      clear: {
        name: "clear",
        description: "Clear messages [ ADMINISTRATOR ]",
        option: {
          name: "messages",
          description: "Count messages",
        },
      },
      help: {
        name: "help",
        description: "All commands",
      },
      serverInfo: {
        name: "serverinfo",
        description: "Information server",
      },
      userInfo: {
        name: "userinfo",
        description: "Information user",
        option: {
          name: "user",
          description: "Users",
        },
      },
      setupChannel: {
        name: "setup",
        description: "Setup channels [ ADMINISTRATOR ]",

        welcomeChannel: {
          name: "welcome",
          description:
            'Select channel for the "welcome messages" [ ADMINISTRATOR ]',
          option: {
            name: "channel",
            description: 'Channel for the "welcome messages" [ ADMINISTRATOR ]',
          },
        },
        logChannel: {
          name: "log",
          description: "Select channel for the logs [ ADMINISTRATOR ]",
          option: {
            name: "channel",
            description: "Channel for the logs",
          },
        },
      },
    },

    filePath: {
      handlersPath: "Handlers",
      jsFileExtension: ".js",
      pngFileExtension: "png",
      commandsPath: "Commands",
      eventsPath: "Events",
    },
    presence: {
      status: {
        online: "Online",
        idle: "Idle",
        offline: "Offline",
        dnd: "Do Not Disturb",
      },
      offline: "offline",
    },
  },

  embeds: {
    clear: {
      description: {
        messageDeletionLimit: bold(
          "❌ You cannot delete more than 100 messages!"
        ),
        incorrectNumberMessages: bold(
          "❌ You cannot delete negative and zero messages!"
        ),
        messageDeleted: bold("{{numMessages}} messages deleted"),
      },
    },
    help: {
      title: {
        name: "Help menu",
      },
    },
    serverInfo: {
      title: {
        name: "About server",
      },
      fields: {
        aboutServer: {
          name: "Information server",
          serverName: bold("Server name :"),
          owner: bold("Owner :"),
          createdTime: bold("Created at :"),
        },
        aboutMembers: {
          name: "Members [ {{memberCount}} ]",
          serverMembers: "<:B5:1045606688742440970>Users :",
          serverBots: "<:B5:1045606688742440970>Bots :",
        },
        aboutChannels: {
          name: "Channels [ {{channels}} ]",
          serverTextChannels: "<:B5:1045606688742440970>Text channels :",
          serverVoiceChannels: "<:B5:1045606688742440970>Voice channels :",
          serverCategories: "<:B5:1045606688742440970>Categories :",
        },
        aboutEmojis: {
          name: "Emojis [ {{emojiCount}} ]",
          emojiAnimate: "<:B5:1045606688742440970>Animate :",
          emojiStatic: "<:B5:1045606688742440970>Static :",
        },
        aboutRoles: {
          name: "Roles [ {{serverRolesLength}} ]",
        },
      },
    },
    userInfo: {
      title: {
        name: "User Info",
      },
      fields: {
        aboutUser: {
          name: "About user",
          nickname: "<:B5:1045606688742440970>Nickname :",
          userId: "<:B5:1045606688742440970>ID :",
          createdTime: "<:B5:1045606688742440970>Created at :",
          userStatus: "<:B5:1045606688742440970>Status :",
        },
        aboutMember: {
          name: "About member",
          joinedTime: "<:B5:1045606688742440970>Joined at :",
        },
        memberRoles: {
          name: "Roles",
          noRoles: "no roles",
        },
      },
    },

    welcomeChannel: {
      description: {
        editedChannel: bold(
          `<:bot:1045603649340063814> Welcome channel was changed at ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
        installedChannel: bold(
          `<:bot:1045603649340063814> Welcome channel is set at  ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
      },
    },

    logChannel: {
      description: {
        editedChannel: bold(
          `<:bot:1045603649340063814> Logs channel was changed at ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
        installedChannel: bold(
          `<:bot:1045603649340063814> Logs channel is set at ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
      },
    },

    images: {
      empyAva: {
        url: "https://i.imgur.com/ZvDmhN9.png",
      },
    },
  },

  logs: {
    errors: {
      title: chalk.red("[ERROR] ❯"),
      body: {
        errorCallCommand: "An error occurred while calling this command!",
      },
    },
    success: {
      title: {
        dbTitle: chalk.blue("[DATABASE STATUS] ❯"),
        logsTitle: chalk.green("[LOGS] ❯"),
      },
      body: {
        dbConnected: chalk.black("Connected"),
      },
    },
  },

  time: {
    moment: {
      momentLocale: "ru",
      momentWeekList:
        "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday",
    },
    defaultTimeFormat: "dddd, DD.MM.YYYY HH:mm",
  },

  memberCard: {
    title: "title",
    userNameBox: "username-box",
    discriminatorBox: "discriminator-box",
    messageBox: "message-box",
    avatar: "avatar",
    color: {
      userBox: "#000000",
      main: "#ffffff",
    },
    attachment: {
      welcome: "welcome.png",
    },
  },
};
