const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  bold,
} = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
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
     * ! ПЕРЕМЕННЫЕ
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
    const embedDescription = bold(ru.embeds.clear.description.value1);
    const embedDescription2 = bold(ru.embeds.clear.description.value2);
    const embedDescription3 = bold(ru.embeds.clear.description.value3);

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
