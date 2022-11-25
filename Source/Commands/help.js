const { SlashCommandBuilder, bold } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const en = require("../../Config/Languages/en");
const ru = require("../../Config/Languages/ru");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(en.bot.commands.help.name)
    .setDescription(en.bot.commands.help.description)
    .setDescriptionLocalizations({
      ru: ru.bot.commands.help.description,
      uk: ru.bot.commands.help.description,
    }),
  async execute(interaction) {
    const embedTitle = en.embeds.help.title.name;
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
