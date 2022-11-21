const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const ru = require("../../Config/ru");
const mustache = require("mustache");
const botConfig = require("../../Config/botConfig");

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
     * ! ПЕРЕМЕННАЯ: КОЛИЧЕСТВО СООБЩЕНИЙ
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
    const errorColor = botConfig.embedColors.error;
    const successColor = botConfig.embedColors.success;

    /**
     * ! --------------------------------
     * ! ПРОВЕРКА НА КОЛИЧЕСТВО ВВЕДЁЕННЫХ СООБЩЕНИЙ
     * ! --------------------------------
     */
    if (numMessages > 100) {
      return await interaction.reply({
        embeds: [embedSetup("", messageDeletionLimit, "", errorColor, "")],
        ephemeral: true,
      });
    } else if (numMessages <= 0) {
      return await interaction.reply({
        embeds: [embedSetup("", cannotDeleteMsgs, "", errorColor, "")],
        ephemeral: true,
      });
    }
    await interaction.channel.bulkDelete(numMessages, true);
    await interaction.reply({
      embeds: [embedSetup("", messageDeleted, "", successColor, "")],
      ephemeral: true,
    });
  },
};
