const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Все команды"),
  async execute(interaction) {
    await interaction.reply("**Все команды**");
  },
};
