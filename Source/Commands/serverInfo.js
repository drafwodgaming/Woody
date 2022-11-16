const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Информация о сервере"),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ИНФОРМАЦИЯ О СЕРВЕРЕ
     * ! --------------------------------
     */
    const guildName = interaction.guild.name;
    const guildOwner = interaction.guild.ownerId;
    const guildCreatedTimestamp = parseInt(
      interaction.guild.createdTimestamp / 1000
    );
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ПОЛЬЗОВАТЕЛИ
     * ! --------------------------------
     */
    const guildMemberCount = interaction.guild.memberCount;
    const guildMembers = interaction.guild.members.cache.filter(
      (m) => !m.user.bot
    ).size;
    const guildBots = interaction.guild.members.cache.filter(
      (m) => m.user.bot
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: КАНАЛЫ
     * ! --------------------------------
     */
    const guildChannels = interaction.guild.channels.cache.size;
    const guildTextChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === ChannelType.GuildText
    ).size;
    const guildVoiceChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === ChannelType.GuildVoice
    ).size;
    const guildCategory = interaction.guild.channels.cache.filter(
      (c) => c.type === ChannelType.GuildCategory
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: ЭМОДЗИ
     * ! --------------------------------
     */
    const guildEmojiCount = interaction.guild.emojis.cache.size;
    const guildEmojiAnimate = interaction.guild.emojis.cache.filter(
      (e) => e.animated
    ).size;
    const guildEmojiStatic = interaction.guild.emojis.cache.filter(
      (e) => !e.animated
    ).size;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const embedFields = [
      {
        name: "Информация о сервере",
        value:
          `**Название :** ${guildName}\n` +
          `**Создатель :** <@${guildOwner}>\n` +
          `**Создан :** <t:${guildCreatedTimestamp}:R>`,
      },
      {
        name: "📯┃Пользователи",
        value:
          `**Всего :** ${guildMemberCount}\n` +
          `*- Люди* : ${guildMembers}\n` +
          `*- Боты* : ${guildBots}\n`,
      },
      {
        name: "📢┃Каналы",
        value:
          `**Всего :** ${guildChannels}\n` +
          `*- Текстовые* : ${guildTextChannels}\n` +
          `*- Голосовые* : ${guildVoiceChannels}\n` +
          `*- Категории* : ${guildCategory}\n`,
      },
      {
        name: "😁┃Эмодзи",
        value:
          `**Всего :** ${guildEmojiCount}\n` +
          `*- Анимированные* : ${guildEmojiAnimate}\n` +
          `*- Статичные* : ${guildEmojiStatic}\n`,
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
