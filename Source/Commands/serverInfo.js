const {
  SlashCommandBuilder,
  ChannelType,
  userMention,
  TimestampStyles,
  time,
  bold,
  italic,
} = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const { stripIndents } = require("common-tags");
const ru = require("../../Config/ru");
const mustache = require("mustache");

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
    const name = interaction.guild.name;
    const ownerId = interaction.guild.ownerId;
    const createdTimestamp = parseInt(
      interaction.guild.createdTimestamp / 1000
    );
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛИ
     * ! --------------------------------
     */
    const memberCount = interaction.guild.memberCount;
    const members = interaction.guild.members.cache.filter(
      (m) => !m.user.bot
    ).size;
    const bots = interaction.guild.members.cache.filter((m) => m.user.bot).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: КАНАЛЫ
     * ! --------------------------------
     */
    const channels = interaction.guild.channels.cache.size;
    const textChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === ChannelType.GuildText
    ).size;
    const voiceChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === ChannelType.GuildVoice
    ).size;
    const categories = interaction.guild.channels.cache.filter(
      (c) => c.type === ChannelType.GuildCategory
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ЭМОДЗИ
     * ! --------------------------------
     */
    const emojiCount = interaction.guild.emojis.cache.size;
    const emojisAnimate = interaction.guild.emojis.cache.filter(
      (e) => e.animated
    ).size;
    const emojisStatic = interaction.guild.emojis.cache.filter(
      (e) => !e.animated
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
        ${ru.embeds.serverInfo.fields.aboutServer.serverName} ${name}
        ${ru.embeds.serverInfo.fields.aboutServer.owner} ${userMention(ownerId)}
        ${ru.embeds.serverInfo.fields.aboutServer.createdTime} ${time(
          createdTimestamp,
          TimestampStyles.LongDate
        )}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutMembers.name, {
          memberCount: memberCount,
        }),
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutMembers.serverMembers} ${members}
        ${ru.embeds.serverInfo.fields.aboutMembers.serverBots} ${bots}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutChannels.name, {
          channels: channels,
        }),
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutChannels.serverTextChannels} ${textChannels}
        ${ru.embeds.serverInfo.fields.aboutChannels.serverVoiceChannels} ${voiceChannels}
        ${ru.embeds.serverInfo.fields.aboutChannels.serverCategories} ${categories}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutEmoji.name, {
          emojiCount: emojiCount,
        }),
        value: stripIndents`
        ${ru.embeds.serverInfo.fields.aboutEmoji.serverAnimate} ${emojisAnimate}
        ${ru.embeds.serverInfo.fields.aboutEmoji.serverStatic} ${emojisStatic}
        `,
      },
      {
        name: mustache.render(ru.embeds.serverInfo.fields.aboutRoles.name, {
          serverRolesLength: serverRolesLength,
        }),
        value: serverRoles,
      },
    ];
    const embedThumbnailImage = {
      url: interaction.guild.iconURL() || ru.embeds.serverInfo.thumbnail.url,
    };
    await interaction.reply({
      embeds: [
        embedSetup(embedTittle, "", embedFields, 0xffffff, embedThumbnailImage),
      ],
    });
  },
};
