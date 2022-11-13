const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      await command.execute(interaction).catch(async (error) => {
        console.log(`[Ошибка] ${error}`);
        await interaction.reply({
          content: "Произошла ошибка при вызове этой команды!",
          ephemeral: true,
        });
      });
    }
  },
};
