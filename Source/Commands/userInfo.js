const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const { stripIndents } = require("common-tags");
const locales = require("../Functions/locales");
const en = require("../../Config/Languages/en");
const ru = require("../../Config/Languages/ru");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(en.bot.commands.userInfo.name)
    .setDescription(en.bot.commands.userInfo.description)
    .setDescriptionLocalizations({
      ru: ru.bot.commands.userInfo.description,
      uk: ru.bot.commands.userInfo.description,
    })
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName(en.bot.commands.userInfo.option.name)
        .setDescription(en.bot.commands.userInfo.option.description)
        .setDescriptionLocalizations({
          ru: ru.bot.commands.userInfo.description,
          uk: ru.bot.commands.userInfo.description,
        })
        .setRequired(true)
    ),
  async execute(interaction) {
    moment.updateLocale(locales[interaction.locale].time.moment.momentLocale, {
      weekdays:
        locales[interaction.locale].time.moment.momentWeekList.split("_"),
    });

    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛЯ
     * ! --------------------------------
     */
    let targetUser = interaction.options.getUser(
      ru.bot.commands.userInfo.option.name
    );
    const guildMember = interaction.guild.members.cache.get(targetUser.id);

    const userCreatedAt = moment(targetUser.createdAt).format(
      locales[interaction.locale].time.defaultTimeFormat
    );

    const statusList = {
      online: locales[interaction.locale].bot.presence.status.online,
      idle: locales[interaction.locale].bot.presence.status.idle,
      offline: locales[interaction.locale].bot.presence.status.offline,
      dnd: locales[interaction.locale].bot.presence.status.dnd,
    };
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: УЧАСТНИКА НА СЕРВЕРЕ
     * ! --------------------------------
     */
    const memberJoinedAt = moment(guildMember.joinedAt).format(
      locales[interaction.locale].time.defaultTimeFormat
    );
    const memberRoles = guildMember.roles.cache
      .map((role) => role)
      .sort((a, b) => b.position - a.position)
      .filter((role) => role.id != interaction.guild.id)
      .join(" ");
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const embedTitle = locales[interaction.locale].embeds.userInfo.title.name;
    const embedFields = [
      {
        name: locales[interaction.locale].embeds.userInfo.fields.aboutUser.name,
        value: stripIndents`
        ${
          locales[interaction.locale].embeds.userInfo.fields.aboutUser.nickname
        } ${targetUser}
        ${
          locales[interaction.locale].embeds.userInfo.fields.aboutUser.userId
        } ${targetUser.id}
        ${
          locales[interaction.locale].embeds.userInfo.fields.aboutUser
            .createdTime
        } \`${userCreatedAt}\`
        ${
          locales[interaction.locale].embeds.userInfo.fields.aboutUser
            .userStatus
        } ${
          statusList[
            guildMember.presence
              ? guildMember.presence.status
              : locales[interaction.locale].bot.presence.offline
          ]
        }
        `,
      },
      {
        name: locales[interaction.locale].embeds.userInfo.fields.aboutMember
          .name,
        value: stripIndents`
        ${
          locales[interaction.locale].embeds.userInfo.fields.aboutMember
            .joinedTime
        } \`${memberJoinedAt}\`
        `,
      },
      {
        name: locales[interaction.locale].embeds.userInfo.fields.memberRoles
          .name,
        value:
          memberRoles ||
          locales[interaction.locale].embeds.userInfo.fields.memberRoles
            .noRoles,
      },
    ];
    const botColor = botConfig.embedColors.botColor;
    const embedThumbnailImage = {
      url: targetUser.avatarURL() || ru.embeds.images.empyAva.url,
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          embedTitle,
          undefined,
          embedFields,
          botColor,
          embedThumbnailImage
        ),
      ],
    });
  },
};
