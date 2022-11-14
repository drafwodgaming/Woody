const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../function/embedSetup");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Меню помощи"),
  async execute(interaction) {
    const embedDescription = interaction.client.commandsArray
      .map((command) => `**/${command.name}** \n ${command.description}\n`)
      .join("\n");
    await interaction.reply({
      embeds: [embedSetup("Меню помощи", embedDescription, 0xf6d065)],
      ephemeral: true,
    });
  },
};
