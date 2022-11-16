const { SlashCommandBuilder } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Информация о сервере")
    .addUserOption((option) =>
      option.setName("user").setDescription("Пользователи").setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser("user");
    const userCreatedTimestamp = parseInt(targetUser.createdTimestamp / 1000);

    const embedFields = [
      {
        name: "Информация о пользователе",
        value:
          `**Никнейм :** ${targetUser}\n` +
          `**ID :** ||${targetUser.id}||\n` +
          `**Создан :** <t:${userCreatedTimestamp}:R>`,
        inline: true,
      },
      {
        name: "ㅤ",
        value: `**TAG :** ${targetUser.tag}\n`,
        inline: true,
      },
    ];

    const embedThumbnailImage = {
      url: targetUser.avatarURL() || "https://i.imgur.com/ZvDmhN9.png",
    };

    await interaction.reply({
      embeds: [
        embedSetup("О сервере", "", embedFields, 0xffffff, embedThumbnailImage),
      ],
    });
  },
};
