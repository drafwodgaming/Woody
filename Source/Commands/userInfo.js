const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Информация о сервере")
    .addUserOption((option) =>
      option.setName("user").setDescription("Пользователи")
    ),
  async execute(interaction) {
    const getUser = interaction.options.getUser("user");

    const embedFields = [
      {
        name: "Информация о сервере",
        value: `**Название : ${interaction.getUser.name}`,
      },
    ];

    const embedThumbnailImage = {
      url: interaction.guild.iconURL() || "https://i.imgur.com/ZvDmhN9.png",
    };

    await interaction.reply({
      embeds: [
        embedSetup("О сервере", "", embedFields, 0xffffff, embedThumbnailImage),
      ],
    });
  },
};
