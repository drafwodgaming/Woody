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
    const guildMember = interaction.guild.members.cache.get(targetUser.id);
    const userCreatedAt = moment(targetUser.createdAt).format(
      "dddd, DD.MM.YYYY HH:mm"
    );
    let status = guildMember.presence.status;

    if (status == "dnd") status = "⛔ Не беспокоить";
    if (status == "online") status = "🟢 В сети";
    if (status == "offline") status = "Не в сети";
    if (status == "idle") status = "🌙 Отошёл";

    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
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
        value:
          `*- Никнейм* : ${targetUser}\n` +
          `*- ID* : ${targetUser.id}\n` +
          `*- Зарегистрирован* : \`${userCreatedAt}\`\n` +
          `*- Статус* : ${status}`,
      },
      {
        name: "Информация об участнике",
        value: `*- Присоединился к серверу* : \`${memberJoinedAt}\` \n`,
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
