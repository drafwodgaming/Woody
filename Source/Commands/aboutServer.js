const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about-server")
    .setDescription("Информация о сервере."),
  async execute(interaction) {
    const embedDescription =
      `**Название :** ${interaction.guild.name}\n` +
      `**Создатель :** <@${interaction.guild.ownerId}>`;
    await interaction.reply({
      embeds: [embedSetup("О сервере", embedDescription, 0x2f3136)],
    });
  },
};
