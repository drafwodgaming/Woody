const { SlashCommandBuilder, bold } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const ru = require("../../Config/Languages/ru");
const botConfig = require("../../Config/botConfig");
const en = require("../../Config/Languages/en");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.help.name)
    .setDescription(ru.bot.commands.help.description),
  async execute(interaction) {
    const embedTitle = ru.embeds.help.title.name;
    const embedDescription = interaction.client.commandsArray
      .map((command) => `/${bold(command.name)} \n ${command.description}\n`)
      .join("\n");

    const embedColor = botConfig.embedColors.botColor;
    await interaction.reply({
      embeds: [embedSetup(embedTitle, embedDescription, undefined, embedColor)],
      ephemeral: true,
    });
  },
};
