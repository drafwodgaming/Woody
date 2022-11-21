const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const ru = require("../../Config/ru");
const mustache = require("mustache");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.clear.name)
    .setDescription(ru.bot.commands.clear.description)
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption((option) =>
      option
        .setName(ru.bot.commands.clear.option.name)
        .setDescription(ru.bot.commands.clear.option.description)
        .setRequired(true)
    ),
  async execute(interaction) {
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ
     * ! --------------------------------
     */
    const numMessages = interaction.options.get(
      ru.bot.commands.clear.option.name
    ).value;
    /**я так и
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const messageDeletionLimit =
      ru.embeds.clear.description.messageDeletionLimit;
    const cannotDeleteMsgs = ru.embeds.clear.description.cannotDeleteMsgs;
    const messageDeleted = mustache.render(
      ru.embeds.clear.description.messageDeleted,
      {
        numMessages: numMessages,
      }
    );
    if (numMessages > 100) {
      return await interaction.reply({
        embeds: [embedSetup("", messageDeletionLimit, "", 0x2f3136, "")],
        ephemeral: true,
      });
    } else if (numMessages <= 0) {
      return await interaction.reply({
        embeds: [embedSetup("", cannotDeleteMsgs, "", 0x2f3136, "")],
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(numMessages, true);
    await interaction.reply({
      embeds: [embedSetup("", messageDeleted, "", 0x2f3136, "")],
      ephemeral: true,
    });
  },
};
