const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../function/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about-server")
    .setDescription("Информация о сервере."),
  async execute(interaction) {
    await interaction.reply({
      embeds: [embedSetup("О сервере", "**Название:**", 0x2f3136)],
    });
  },
};
