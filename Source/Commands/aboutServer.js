const { SlashCommandBuilder, messageLink } = require("discord.js");
const emojiCharacters = require("../../Config/emojiCharacters");
const { embedSetup } = require("../functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Информация о сервере"),
  async execute(interaction) {
    const embedFields = [
      {
        name: "Информация о сервере",
        value:
          `**- Название :** ${interaction.guild.name}\n` +
          `**- Создатель :** <@${interaction.guild.ownerId}>\n` +
          `**- Создан :** <t:${parseInt(
            interaction.guild.createdTimestamp / 1000
          )}:R>`,
      },
      {
        name: "📯┃Пользователи",
        value:
          `**Всего :** ${interaction.guild.memberCount}\n` +
          `ㅤ*- Люди* : ${
            interaction.guild.members.cache.filter((m) => !m.user.bot).size
          }\n` +
          `ㅤ*- Боты* : ${
            interaction.guild.members.cache.filter((m) => m.user.bot).size
          }\n`,
      },
      {
        name: "📡┃Каналы",
        value:
          `**Всего :** ${interaction.guild.channels.cache.size}\n` +
          `ㅤ*- Текстовые* : ${
            interaction.guild.channels.cache.filter(
              (c) => c.type === "GUILD_TEXT"
            ).size
          }\n` +
          `ㅤ*- Голосовые* : ${
            interaction.guild.channels.cache.filter(
              (c) => c.type === "GUILD_VOICE"
            ).size
          }\n`,
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
