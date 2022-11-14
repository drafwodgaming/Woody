const { SlashCommandBuilder } = require("discord.js");
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
      url: interaction.guild.iconURL(),
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
