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
        name: ru.embeds.serverInfo.fields.field1.name,
        value: stripIndents`
        ${bold(ru.embeds.serverInfo.fields.field1.value1)} ${name}
        ${bold(ru.embeds.serverInfo.fields.field1.value2)} ${userMention(
          ownerId
        )}
        ${bold(ru.embeds.serverInfo.fields.field1.value3)} ${time(
          createdTimestamp,
          TimestampStyles.LongDate
        )}
        `,
      },
      {
        name: `${ru.embeds.serverInfo.fields.field2.name} [ ${memberCount} ]`,
        value: stripIndents`
        ${italic(ru.embeds.serverInfo.fields.field2.value1)} : ${members}
        ${italic(ru.embeds.serverInfo.fields.field2.value2)} : ${bots}
        `,
      },
      {
        name: `${ru.embeds.serverInfo.fields.field3.name} [ ${channels} ]`,
        value: stripIndents`
        ${italic(ru.embeds.serverInfo.fields.field3.value1)} : ${textChannels}
        ${italic(ru.embeds.serverInfo.fields.field3.value2)} : ${voiceChannels}
        ${italic(ru.embeds.serverInfo.fields.field3.value3)} : ${categories}
        `,
      },
      {
        name: `${ru.embeds.serverInfo.fields.field4.name} [ ${emojiCount} ]`,
        value: stripIndents`
        ${italic(ru.embeds.serverInfo.fields.field4.value1)} : ${emojisAnimate}
        ${italic(ru.embeds.serverInfo.fields.field4.value2)} : ${emojisStatic}
        `,
      },
      {
        name: `${ru.embeds.serverInfo.fields.field5.name} [ ${serverRolesLength} ]`,
        value: `${serverRoles}`,
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
