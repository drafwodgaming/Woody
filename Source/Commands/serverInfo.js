const {
  SlashCommandBuilder,
  ChannelType,
  userMention,
  TimestampStyles,
  time,
} = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const { stripIndents } = require("common-tags");
const mustache = require("mustache");
const botConfig = require("../../Config/botConfig");
const locales = require("../Functions/locales");
const en = require("../../Config/Languages/en");
const ru = require("../../Config/Languages/ru");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(en.bot.commands.serverInfo.name)
    .setDescription(en.bot.commands.serverInfo.description)
    .setDescriptionLocalizations({
      ru: ru.bot.commands.userInfo.description,
      uk: ru.bot.commands.userInfo.description,
    })
    .setDMPermission(false),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ИНФОРМАЦИЯ О СЕРВЕРЕ
     * ! --------------------------------
     */
    const serverName = interaction.guild.name;
    const ownerId = interaction.guild.ownerId;
    const createdTimestamp = parseInt(
      interaction.guild.createdTimestamp / 1000
    );
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛИ
     * ! --------------------------------
     */
    const allGuildMembers = interaction.guild.memberCount;
    const guildMembers = interaction.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const botsNumber = interaction.guild.members.cache.filter(
      (member) => member.user.bot
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: КАНАЛЫ
     * ! --------------------------------
     */
    const serverChannels = interaction.guild.channels.cache.size;
    const textChannels = interaction.guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildText
    ).size;
    const voiceChannels = interaction.guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice
    ).size;
    const serverCategories = interaction.guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildCategory
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ЭМОДЗИ
     * ! --------------------------------
     */
    const emojiCount = interaction.guild.emojis.cache.size;
    const emojisAnimate = interaction.guild.emojis.cache.filter(
      (emoji) => emoji.animated
    ).size;
    const emojisStatic = interaction.guild.emojis.cache.filter(
      (emoji) => !emoji.animated
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: РОЛИ
     * ! --------------------------------
     */
    const serverRoles = interaction.guild.roles.cache
      .map((role) => role.toString())
      .slice(1, 21)
      .join(" ");
    const serverRolesLength = interaction.guild.roles.cache.map(
      (role) => role.name
    ).length;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const embedTittle =
      locales[interaction.locale].embeds.serverInfo.title.name;
    const embedFields = [
      {
        name: locales[interaction.locale].embeds.serverInfo.fields.aboutServer
          .name,
        value: stripIndents`
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutServer
            .serverName
        } ${serverName}
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutServer.owner
        } ${userMention(ownerId)}
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutServer
            .createdTime
        } ${time(createdTimestamp, TimestampStyles.LongDate)}
        `,
      },
      {
        name: mustache.render(
          locales[interaction.locale].embeds.serverInfo.fields.aboutMembers
            .name,
          {
            memberCount: allGuildMembers,
          }
        ),
        value: stripIndents`
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutMembers
            .serverMembers
        } ${guildMembers}
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutMembers
            .serverBots
        } ${botsNumber}
        `,
      },
      {
        name: mustache.render(
          locales[interaction.locale].embeds.serverInfo.fields.aboutChannels
            .name,
          {
            channels: serverChannels,
          }
        ),
        value: stripIndents`
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutChannels
            .serverTextChannels
        } ${textChannels}
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutChannels
            .serverVoiceChannels
        } ${voiceChannels}
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutChannels
            .serverCategories
        } ${serverCategories}
        `,
      },
      {
        name: mustache.render(
          locales[interaction.locale].embeds.serverInfo.fields.aboutEmojis.name,
          {
            emojiCount: emojiCount,
          }
        ),
        value: stripIndents`
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutEmojis
            .emojiAnimate
        } ${emojisAnimate}
        ${
          locales[interaction.locale].embeds.serverInfo.fields.aboutEmojis
            .emojiStatic
        } ${emojisStatic}
        `,
      },
      {
        name: mustache.render(
          locales[interaction.locale].embeds.serverInfo.fields.aboutRoles.name,
          {
            serverRolesLength: serverRolesLength,
          }
        ),
        value: serverRoles,
      },
    ];
    const botColor = botConfig.embedColors.botColor;
    const embedThumbnailImage = {
      url: interaction.guild.iconURL() || ru.embeds.images.emptyAva.url,
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          embedTittle,
          undefined,
          embedFields,
          botColor,
          embedThumbnailImage
        ),
      ],
    });
  },
};
