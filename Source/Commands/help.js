const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../functions/embedSetup");
const ru = require("../../Config/ru");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.help.name)
    .setDescription(ru.bot.commands.help.description),
  async execute(interaction) {
    const embedDescription = interaction.client.commandsArray
      .map((command) => `**/${command.name}** \n ${command.description}\n`)
      .join("\n");

    await interaction.reply({
      embeds: [embedSetup("Команды", embedDescription, "", 0xf6d065)],
      ephemeral: true,
    });
  },
};
