const { SlashCommandBuilder, italic } = require("discord.js");
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
    const embedTitle = ru.embeds.userInfo.title.name;
    const embedFields = [
      {
        name: ru.embeds.userInfo.fields.field1.name,
        value: stripIndents`
        ${italic(ru.embeds.userInfo.fields.field1.value1)} ${targetUser}
        ${italic(ru.embeds.userInfo.fields.field1.value2)} ${targetUser.id}
        ${italic(ru.embeds.userInfo.fields.field1.value3)} \`${userCreatedAt}\`
        ${italic(ru.embeds.userInfo.fields.field1.value4)} ${
          statusList[
            guildMember.presence ? guildMember.presence.status : "offline"
          ]
        }
        `,
      },
      {
        name: ru.embeds.userInfo.fields.field2.name,
        value: stripIndents`
        ${italic(ru.embeds.userInfo.fields.field2.value1)} \`${memberJoinedAt}\`
        `,
      },
      {
        name: ru.embeds.userInfo.fields.field3.name,
        value: `${memberRoles || ru.embeds.userInfo.fields.field3.value1}`,
      },
    ];

    const embedThumbnailImage = {
      url: targetUser.avatarURL() || "https://i.imgur.com/ZvDmhN9.png",
    };
    await interaction.reply({
      embeds: [
        embedSetup(embedTitle, "", embedFields, 0x2f3136, embedThumbnailImage),
      ],
    });
  },
};
