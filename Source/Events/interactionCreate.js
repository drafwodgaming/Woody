const { Events } = require("discord.js");
const chalk = require("chalk");
const ru = require("../../Config/ru");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      await command.execute(interaction).catch(async (error) => {
        console.log(chalk.redBright(`${ru.logs.errors.title} ${error}`));
        await interaction.reply({
          content: ru.logs.errors.body.errorCallCommand,
          ephemeral: true,
        });
      });
    }
  },
};
