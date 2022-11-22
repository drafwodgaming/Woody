const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const ru = require("../../Config/ru");
const welcomeChannelSchema = require("../Models/channelId");
const mustache = require("mustache");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.welcomeChannel.name)
    .setDescription(ru.bot.commands.welcomeChannel.description)
    .setDMPermission(false)
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

    const editChannel = mustache.render(
      ru.embeds.welcomeChannel.description.editedChannel,
      {
        interactionChannelId: interactionChannel,
      }
    );

    const installedChannel = mustache.render(
      ru.embeds.welcomeChannel.description.installedChannel,
      {
        interactionChannelId: interactionChannel,
      }
    );
    const embedColor = botConfig.embedColors.success;

    if (welcomeChannel) {
      welcomeChannel.channelId = interactionChannel.id;
      welcomeChannel.guildId = interactionGuildId;
      await welcomeChannel.save();
      await interaction.reply({
        embeds: [embedSetup(undefined, editChannel, undefined, embedColor)],
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
      embeds: [embedSetup(undefined, installedChannel, undefined, embedColor)],
      ephemeral: true,
    });
  },
};
