const { SlashCommandBuilder } = require("discord.js");
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
          `**> Название :** ${interaction.guild.name}\n` +
          `**> ID :** ${interaction.guild.id}\n`,
      },
    ];
    const embedDescription =
      `` +
      `**Создатель :** <@${interaction.guild.ownerId}>\n` +
      `**Участники :** ${interaction.guild.memberCount}\n`;
    const embedThumbnailImage = {
      url: interaction.guild.iconURL() || "https://i.imgur.com/ZvDmhN9.png",
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          "О сервере",
          embedDescription,
          embedFields,
          0xffffff,
          embedThumbnailImage
        ),
      ],
    });
  },
};
