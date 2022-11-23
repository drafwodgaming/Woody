const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const mustache = require("mustache");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const ru = require("../../Config/ru");

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
    /**
     * ! --------------------------------
     * ! ПЕРЕМЕННЫЕ: EMBED
     * ! --------------------------------
     */
    const messageDeletionLimit =
      ru.embeds.clear.description.messageDeletionLimit;
    const incorrectNumberMessages =
      ru.embeds.clear.description.incorrectNumberMessages;
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
        embeds: [
          embedSetup(
            undefined,
            messageDeletionLimit,
            undefined,
            errorColor,
            undefined
          ),
        ],
        ephemeral: true,
      });
    } else if (numMessages <= 0) {
      return await interaction.reply({
        embeds: [
          embedSetup(
            undefined,
            incorrectNumberMessages,
            undefined,
            errorColor,
            undefined
          ),
        ],
        ephemeral: true,
      });
    }
    /**
     * ! --------------------------------
     * ! УДАЛЕНИЕ СООБЩЕНИЙ
     * ! --------------------------------
     */
    await interaction.channel.bulkDelete(numMessages, true);
    await interaction.reply({
      embeds: [
        embedSetup(
          undefined,
          messageDeleted,
          undefined,
          successColor,
          undefined
        ),
      ],
      ephemeral: true,
    });
  },
};
