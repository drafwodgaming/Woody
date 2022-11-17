const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
moment.updateLocale(botConfig.momentLocale, {
  weekdays: botConfig.momentWeekList.split("_"),
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Информация о сервере")
    .addUserOption((option) =>
      option.setName("user").setDescription("Пользователи").setRequired(true)
    ),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛЯ
     * ! --------------------------------
     */
    const targetUser = interaction.options.getUser("user");
    const userCreatedTimestamp = parseInt(targetUser.createdTimestamp / 1000);

    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
     * ! --------------------------------
     */
    const guildMember = interaction.guild.members.cache.get(targetUser.id);
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
        value:
          `**Никнейм :** ${targetUser} (${targetUser.tag}) \n` +
          `**ID :** ||${targetUser.id}||\n` +
          `**Зарегистрирован :** <t:${userCreatedTimestamp}:R>\n`,
        inline: true,
      },
      {
        name: "ㅤ",
        value:
          `**Присоединился к серверу :** \`${memberJoinedAt}\` \n` +
          `**Роли пользователя :**\n ${memberRoles}`,
        inline: true,
      },
    ];

    const embedThumbnailImage = {
      url: targetUser.avatarURL() || "https://i.imgur.com/ZvDmhN9.png",
    };
    await interaction.reply({
      embeds: [
        embedSetup("О сервере", "", embedFields, 0xffffff, embedThumbnailImage),
      ],
    });
  },
};
