const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Посмотреть все команды."),
  async execute(interaction) {
    const embedDescription = interaction.client.commandsArray
      .map((command) => `**/${command.name}** \n ${command.description}\n`)
      .join("\n");
    await interaction.reply({
      embeds: [embedSetup("Команды", embedDescription, 0xf6d065)],
      ephemeral: true,
    });
  };
};
