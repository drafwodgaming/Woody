const { bold, italic } = require("discord.js");

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
    },

    filePath: {
      handlersPath: "Handlers",
      jsFileExtension: ".js",
      pngFileExtension: "png",
      commandsPath: "Commands",
      eventsPath: "Events",
    },
  },

  embeds: {
    clear: {
      description: {
        messageDeletionLimit: bold(
          "Вы не можете удалить больше 100 сообщений!"
        ),
        incorrectNumberMessages: bold(
          "Удаление отрицательных и нулевых сообщений невозможно!"
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
          serverMembers: italic("- Люди :"),
          serverBots: italic("- Боты :"),
        },
        aboutChannels: {
          name: "Каналы [ {{channels}} ]",
          serverTextChannels: italic("- Текстовые :"),
          serverVoiceChannels: italic("- Голосовые :"),
          serverCategories: italic("- Категории :"),
        },
        aboutEmojis: {
          name: "Эмодзи [ {{emojiCount}} ]",
          emojiAnimate: italic("- Анимированные :"),
          emojiStatic: italic("- Статичные :"),
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
          nickname: italic("- Никнейм :"),
          userId: italic("- ID :"),
          createdTime: italic("- Зарегистрирован :"),
          userStatus: italic("- Статус :"),
        },
        aboutMember: {
          name: "Информация об участнике",
          joinedTime: italic("- Присоединился к серверу :"),
        },
        memberRoles: {
          name: "Роли",
          noRoles: "нет ролей",
        },
      },
    },
    images: {
      noAva: {
        url: "https://i.imgur.com/ZvDmhN9.png",
      },
    },
  },

  logs: {
    errors: {
      title: "[ERROR] ❯",
      body: {
        errorCallCommand: "Произошла ошибка при вызове этой команды!",
      },
    },
    success: {
      title: {
        dbTitle: "[DATABASE STATUS] ❯",
        logsTitle: "[LOGS] ❯",
      },
      body: {
        dbConnected: "Connected",
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
    guildName: "THE RΞDΔCTΞD",
    title: "title",
    userNameBox: "username-box",
    discriminatorBox: "discriminator-box",
    messageBox: "message-box",
    border: "border",
    avatar: "avatar",
    color: {
      main: "#eb177e",
      border: "#5409e8",
    },
    attachment: {
      welcome: "welcome.png",
      leave: "bye.png",
    },
    content: {
      welcome: "**Приветствуем, <@{{ memberId }}>, добро пожаловать!**",
      leave: "**Удачного пути Страж, <@{{ memberId }}>!**",
    },
  },
};
