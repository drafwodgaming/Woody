const { Events } = require("discord.js");
const ru = require("../../Config/ru");
const mustache = require("mustache");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      await command.execute(interaction).catch(async (error) => {
        console.log(
          ru.logs.errors.title,
          mustache.render(ru.logs.errors.body.errorConsole, {
            error: error,
          })
        );

        await interaction.reply({
          content: ru.logs.errors.body.errorCallCommand,
          ephemeral: true,
        });
      });
    }
  },
};
