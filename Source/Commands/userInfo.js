const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const { stripIndents } = require("common-tags");
const ru = require("../../Config/ru");

moment.updateLocale(botConfig.momentLocale, {
  weekdays: botConfig.momentWeekList.split("_"),
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.userInfo.name)
    .setDescription(ru.bot.commands.userInfo.description)
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName(ru.bot.commands.userInfo.option.name)
        .setDescription(ru.bot.commands.userInfo.option.description)
        .setRequired(true)
    ),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛЯ
     * ! --------------------------------
     */
    const targetUser = interaction.options.getUser(
      ru.bot.commands.userInfo.option.name
    );
    const guildMember = interaction.guild.members.cache.get(targetUser.id);

    const userCreatedAt = moment(targetUser.createdAt).format(
      "dddd, DD.MM.YYYY HH:mm"
    );

    const statusList = {
      online: "В сети",
      idle: "Отошел",
      offline: "Не в сети",
      dnd: "Не трогать",
    };

    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: УЧАСТНИКА НА СЕРВЕРЕ
     * ! --------------------------------
     */
    const memberJoinedAt = moment(guildMember.joinedAt).format(
      "dddd, DD.MM.YYYY HH:mm"
    );
    const memberRoles = guildMember.roles.cache
      .map((r) => r)
      .sort((a, b) => b.position - a.position)
      .filter((r) => r.id != interaction.guild.id)
      .join(" ");

    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const embedFields = [
      {
        name: "Информация о пользователе",
        value: stripIndents`
        *- Никнейм* : ${targetUser}
        *- ID* : ${targetUser.id}
        *- Зарегистрирован* : \`${userCreatedAt}\`
        *- Статус* : ${
          statusList[
            guildMember.presence ? guildMember.presence.status : "offline"
          ]
        }
        `,
      },
      {
        name: "Информация об участнике",
        value: stripIndents`
        *- Присоединился к серверу* : \`${memberJoinedAt}\`
        `,
      },
      {
        name: `Роли`,
        value: `${memberRoles || "нет ролей"}`,
      },
    ];

    const embedThumbnailImage = {
      url: targetUser.avatarURL() || "https://i.imgur.com/ZvDmhN9.png",
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          "О пользователе",
          "",
          embedFields,
          0x2f3136,
          embedThumbnailImage
        ),
      ],
    });
  },
};
