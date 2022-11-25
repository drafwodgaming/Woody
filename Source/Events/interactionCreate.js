const { Events } = require("discord.js");
const ru = require("../../Config/Languages/ru");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      await command.execute(interaction).catch(async (error) => {
        console.log(ru.logs.errors.title, `${error}`);

        await interaction.reply({
          content: ru.logs.errors.body.errorCallCommand,
          ephemeral: true,
        });
      });
    }
  },
};
