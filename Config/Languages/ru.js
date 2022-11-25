const { bold, italic, channelMention } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  bot: {
    commands: {
      clear: {
        name: "clear",
        description: "Очистка сообщений [ АДМИНИСТРАТОР ]",
        option: {
          name: "messages",
          description: "Количество сообщений",
        },
      },
      help: {
        name: "help",
        description: "Посмотреть все команды",
      },
      serverInfo: {
        name: "serverinfo",
        description: "Информация о сервере",
      },
      userInfo: {
        name: "userinfo",
        description: "Информация о пользователе",
        option: {
          name: "user",
          description: "Пользователи",
        },
      },
      setupChannel: {
        name: "setup",
        description: "Настроить каналы",

        welcomeChannel: {
          name: "welcome",
          description:
            "Выбрать канал для приветственных сообщений [ АДМИНИСТРАТОР ]",
          option: {
            name: "channel",
            description: "Канал для приветствия",
          },
        },
        logChannel: {
          name: "log",
          description: "Выбрать канал для логов [ АДМИНИСТРАТОР ]",
          option: {
            name: "channel",
            description: "Канал для логов",
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
        online: "В сети",
        idle: "Отошел",
        offline: "Не в сети",
        dnd: "Не беспокоить",
      },
      offline: "offline",
    },
  },

  embeds: {
    clear: {
      description: {
        messageDeletionLimit: bold(
          "❌ Вы не можете удалить больше 100 сообщений!"
        ),
        incorrectNumberMessages: bold(
          "❌ Удаление отрицательных и нулевых сообщений невозможно!"
        ),
        messageDeleted: bold("{{numMessages}} сообщений удалены"),
      },
    },
    help: {
      title: {
        name: "Команды",
      },
    },
    serverInfo: {
      title: {
        name: "О сервере",
      },
      fields: {
        aboutServer: {
          name: "Информация о сервере",
          serverName: bold("Название :"),
          owner: bold("Создатель :"),
          createdTime: bold("Создан :"),
        },
        aboutMembers: {
          name: "Пользователи [ {{memberCount}} ]",
          serverMembers: "<:B5:1045606688742440970>Люди :",
          serverBots: "<:B5:1045606688742440970>Боты :",
        },
        aboutChannels: {
          name: "Каналы [ {{channels}} ]",
          serverTextChannels: "<:B5:1045606688742440970>Текстовые :",
          serverVoiceChannels: "<:B5:1045606688742440970>Голосовые :",
          serverCategories: "<:B5:1045606688742440970>Категории :",
        },
        aboutEmojis: {
          name: "Эмодзи [ {{emojiCount}} ]",
          emojiAnimate: "<:B5:1045606688742440970>Анимированные :",
          emojiStatic: "<:B5:1045606688742440970>Статичные :",
        },
        aboutRoles: {
          name: "Роли [ {{serverRolesLength}} ]",
        },
      },
    },
    userInfo: {
      title: {
        name: "О пользователе",
      },
      fields: {
        aboutUser: {
          name: "Информация о пользователе",
          nickname: "<:B5:1045606688742440970>Никнейм :",
          userId: "<:B5:1045606688742440970>ID :",
          createdTime: "<:B5:1045606688742440970>Зарегистрирован :",
          userStatus: "<:B5:1045606688742440970>Статус :",
        },
        aboutMember: {
          name: "Информация об участнике",
          joinedTime: "<:B4:1045606684871106600>Присоединился к серверу :",
        },
        memberRoles: {
          name: "Роли",
          noRoles: "нет ролей",
        },
      },
    },

    welcomeChannel: {
      description: {
        editedChannel: bold(
          `<:bot:1045603649340063814> Канал приветствия изменён на ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
        installedChannel: bold(
          `<:bot:1045603649340063814> Канал приветствия установлен на ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
      },
    },

    logChannel: {
      description: {
        editedChannel: bold(
          `<:bot:1045603649340063814> Канал для логов изменён на ${channelMention(
            "{{interactionChannelId}}"
          )}`
        ),
        installedChannel: bold(
          `<:bot:1045603649340063814> Канал для логов установлен на ${channelMention(
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

    loading: {
      description: {
        loadingInfo: bold(
          "<a:circle_loading:1045638284891656234> Загрузка данных"
        ),
      },
    },
  },

  logs: {
    errors: {
      title: chalk.red("[ERROR] ❯"),
      body: {
        errorCallCommand: "Произошла ошибка при вызове этой команды!",
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
        "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота",
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
