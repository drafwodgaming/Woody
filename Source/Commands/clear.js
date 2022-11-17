const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Очистка сообщений [ Administrator ]")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption((option) =>
      option
        .setName("messages")
        .setDescription("Количество сообщений")
        .setRequired(true)
    ),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ
     * ! --------------------------------
     */
    const numMessages = interaction.options.get("messages").value;
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const embedDescription = "**Вы не можете удалить больше 100 сообщений!**";
    const embedDescription2 = `**Удаление ${numMessages} сообщений невозможно!**`;
    const embedDescription3 = `**${numMessages} сообщений удалено!**`;

    if (numMessages > 100) {
      return await interaction.reply({
        embeds: [embedSetup("", embedDescription, "", 0x2f3136, "")],
        ephemeral: true,
      });
    } else if (numMessages <= 0) {
      return await interaction.reply({
        embeds: [embedSetup("", embedDescription2, "", 0x2f3136, "")],
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(numMessages, true);
    await interaction.reply({
      embeds: [embedSetup("", embedDescription3, "", 0x2f3136, "")],
      ephemeral: true,
    });
  },
};
