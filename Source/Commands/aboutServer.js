const { SlashCommandBuilder } = require("discord.js");
const emojiCharacters = require("../../Config/emojiCharacters");
const { embedSetup } = require("../functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about-server")
    .setDescription("Информация о сервере."),
  async execute(interaction) {
    const embedDescription =
      `**Название :** ${interaction.guild.name}\n` +
      `**Создатель :** <@${interaction.guild.ownerId}>\n` +
      `**Участники :** ${interaction.guild.memberCount}\n`;
    const embedThumbnailImage = {
      url:
        interaction.guild.iconURL() ||
        "https://cdn.discordapp.com/attachments/1009065422777225298/1041782288393982042/C2.png",
    };
    await interaction.reply({
      embeds: [
        embedSetup(
          "О сервере",
          embedDescription,
          0x2f3136,
          embedThumbnailImage
        ),
      ],
    });
  },
};
