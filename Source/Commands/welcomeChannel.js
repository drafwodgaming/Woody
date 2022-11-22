const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const ru = require("../../Config/ru");
const welcomeChannelSchema = require("../Models/welcomeChannel");
const mustache = require("mustache");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.welcomeChannel.name)
    .setDescription(ru.bot.commands.welcomeChannel.description)
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName(ru.bot.commands.welcomeChannel.option.name)
        .setDescription(ru.bot.commands.welcomeChannel.option.description)
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  async execute(interaction) {
    const interactionChannel = await interaction.options.getChannel(
      ru.bot.commands.welcomeChannel.option.name
    );
    const interactionGuildId = await interaction.guild.id;
    const welcomeChannel = await welcomeChannelSchema.findOne({
      guildId: interactionGuildId,
    });

    const editChannelDescription = mustache.render(
      ru.embeds.welcomeChannel.description.editedChannel,
      {
        interactionChannelId: interactionChannel.id,
      }
    );

    const installedChannelDescription = mustache.render(
      ru.embeds.welcomeChannel.description.installedChannel,
      {
        interactionChannelId: interactionChannel.id,
      }
    );
    const embedColor = botConfig.embedColors.success;

    if (welcomeChannel) {
      welcomeChannel.channelId = interactionChannel.id;
      welcomeChannel.guildId = interactionGuildId;
      await welcomeChannel.save();
      await interaction.reply({
        embeds: [
          embedSetup(undefined, editChannelDescription, undefined, embedColor),
        ],
        ephemeral: true,
      });
      return;
    }

    const newChannelId = new welcomeChannelSchema({
      channelId: interactionChannel.id,
      guildId: interactionGuildId,
    });
    await newChannelId.save();
    await interaction.reply({
      embeds: [
        embedSetup(
          undefined,
          installedChannelDescription,
          undefined,
          embedColor
        ),
      ],
      ephemeral: true,
    });
  },
};
