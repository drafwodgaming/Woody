const {
  SlashCommandBuilder,
  ChannelType,
  userMention,
  TimestampStyles,
  time,
} = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const { stripIndents } = require("common-tags");
const ru = require("../../Config/Languages/ru");
const mustache = require("mustache");
const botConfig = require("../../Config/botConfig");
const en = require("../../Config/Languages/en");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.serverInfo.name)
    .setDescription(ru.bot.commands.serverInfo.description)
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
    const embedTittle = ru.embeds.serverInfo.title.name;
    const embedFields = [
      {
        name: ru.embeds.serverInfo.fields.aboutServer.name,
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutServer.serverName} ${serverName}
        ${ru.embeds.serverInfo.fields.aboutServer.owner} ${userMention(ownerId)}
        ${ru.embeds.serverInfo.fields.aboutServer.createdTime} ${time(
          createdTimestamp,
          TimestampStyles.LongDate
        )}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutMembers.name, {
          memberCount: allGuildMembers,
        }),
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutMembers.serverMembers} ${guildMembers}
        ${ru.embeds.serverInfo.fields.aboutMembers.serverBots} ${botsNumber}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutChannels.name, {
          channels: serverChannels,
        }),
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutChannels.serverTextChannels} ${textChannels}
        ${ru.embeds.serverInfo.fields.aboutChannels.serverVoiceChannels} ${voiceChannels}
        ${ru.embeds.serverInfo.fields.aboutChannels.serverCategories} ${serverCategories}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutEmojis.name, {
          emojiCount: emojiCount,
        }),
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutEmojis.emojiAnimate} ${emojisAnimate}
        ${ru.embeds.serverInfo.fields.aboutEmojis.emojiStatic} ${emojisStatic}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutRoles.name, {
          serverRolesLength: serverRolesLength,
        }),
        value: serverRoles,
      },
    ];
    const embedColors = botConfig.embedColors.botColor;
    const embedThumbnailImage = {
      url: interaction.guild.iconURL() || ru.embeds.images.emptyAva.url,
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          embedTittle,
          undefined,
          embedFields,
          embedColors,
          embedThumbnailImage
        ),
      ],
    });
  },
};
