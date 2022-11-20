const { SlashCommandBuilder, bold } = require("discord.js");
const { embedSetup } = require("../functions/embedSetup");
const ru = require("../../Config/ru");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.help.name)
    .setDescription(ru.bot.commands.help.description),
  async execute(interaction) {
    const embedTitle = ru.embeds.help.title.name;
    const embedDescription = interaction.client.commandsArray
      .map((command) => `/${bold(command.name)} \n ${command.description}\n`)
      .join("\n");

    await interaction.reply({
      embeds: [embedSetup(embedTitle, embedDescription, "", 0xf6d065)],
      ephemeral: true,
    });
  },
};
