const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Информация о сервере")
    .setDMPermission(false),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ИНФОРМАЦИЯ О СЕРВЕРЕ
     * ! --------------------------------
     */
    const name = interaction.guild.name;
    const owner = interaction.guild.ownerId;
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
    const embedFields = [
      {
        name: "Информация о сервере",
        value:
          `**Название :** ${name}\n` +
          `**Создатель :** <@${owner}>\n` +
          `**Создан :** <t:${createdTimestamp}:D>`,
      },
      {
        name: `Пользователи [ ${memberCount} ]`,
        value: `*- Люди* : ${members}\n` + `*- Боты* : ${bots}\n`,
      },
      {
        name: `Каналы [ ${channels} ]`,
        value:
          `*- Текстовые* : ${textChannels}\n` +
          `*- Голосовые* : ${voiceChannels}\n` +
          `*- Категории* : ${categories}\n`,
      },
      {
        name: `Эмодзи [ ${emojiCount} ]`,
        value:
          `*- Анимированные* : ${emojisAnimate}\n` +
          `*- Статичные* : ${emojisStatic}\n`,
      },
      {
        name: `Роли [ ${serverRolesLength} ]`,
        value: `${serverRoles}`,
      },
    ];
    const embedThumbnailImage = {
      url: interaction.guild.iconURL() || "https://i.imgur.com/ZvDmhN9.png",
    };
    await interaction.reply({
      embeds: [
        embedSetup("О сервере", "", embedFields, 0xffffff, embedThumbnailImage),
      ],
    });
  },
};
