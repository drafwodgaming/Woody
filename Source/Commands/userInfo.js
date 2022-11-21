const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const { stripIndents } = require("common-tags");
const ru = require("../../Config/ru");

moment.updateLocale(ru.time.moment.momentLocale, {
  weekdays: ru.time.moment.momentWeekList.split("_"),
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
      ru.time.defaultTimeFormat
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
      ru.time.defaultTimeFormat
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
        name: ru.embeds.userInfo.fields.aboutUser.name,
        value: stripIndents`
        ${ru.embeds.userInfo.fields.aboutUser.nickname} ${targetUser}
        ${ru.embeds.userInfo.fields.aboutUser.userId} ${targetUser.id}
        ${ru.embeds.userInfo.fields.aboutUser.createdTime} \`${userCreatedAt}\`
        ${ru.embeds.userInfo.fields.aboutUser.userStatus} ${
          statusList[
            guildMember.presence ? guildMember.presence.status : "offline"
          ]
        }
        `,
      },
      {
        name: ru.embeds.userInfo.fields.aboutMember.name,
        value: stripIndents`
        ${ru.embeds.userInfo.fields.aboutMember.joinedTime} \`${memberJoinedAt}\`
        `,
      },
      {
        name: ru.embeds.userInfo.fields.memberRoles.name,
        value: memberRoles || ru.embeds.userInfo.fields.memberRoles.noRoles,
      },
    ];
    const embedColor = botConfig.embedColors.trancparent;

    const embedThumbnailImage = {
      url: targetUser.avatarURL() || ru.embeds.serverInfo.thumbnail.url,
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          embedTitle,
          undefined,
          embedFields,
          embedColor,
          embedThumbnailImage
        ),
      ],
    });
  },
};
