const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../function/embedSetup");
const emojiCharacters = require("../../Config/emojiCharacters");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about-server")
    .setDescription("Информация о сервере."),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        embedSetup(
          "О сервере",
          `**Название:** \` ${interaction.guild.name} \``,
          0xe5be4d
        ),
      ],
    });
  },
};
