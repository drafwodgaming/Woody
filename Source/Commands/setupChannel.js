const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const { embedSetup } = require("../Functions/embedSetup");
const botConfig = require("../../Config/botConfig");
const ru = require("../../Config/ru");
const welcomeChannelSchema = require("../Models/welcomeChannel");
const logChannelSchema = require("../Models/logChannel");
const mustache = require("mustache");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ru.bot.commands.setupChannel.name)
    .setDescription(ru.bot.commands.setupChannel.description)
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName(ru.bot.commands.setupChannel.welcomeChannel.name)
        .setDescription(ru.bot.commands.setupChannel.welcomeChannel.description)
        .addChannelOption((option) =>
          option
            .setName(ru.bot.commands.setupChannel.welcomeChannel.option.name)
            .setDescription(
              ru.bot.commands.setupChannel.welcomeChannel.option.description
            )
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(ru.bot.commands.setupChannel.logChannel.name)
        .setDescription(ru.bot.commands.setupChannel.logChannel.description)
        .addChannelOption((option) =>
          option
            .setName(ru.bot.commands.setupChannel.logChannel.option.name)
            .setDescription(
              ru.bot.commands.setupChannel.logChannel.option.description
            )
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    const interactionChannel = await interaction.options.getChannel("channel");
    const interactionGuildId = await interaction.guild.id;

    switch (subCommand) {
      case "welcome":
        {
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
                embedSetup(
                  undefined,
                  editChannelDescription,
                  undefined,
                  embedColor
                ),
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
        }
        break;

      case "log":
        {
          const logChannel = await logChannelSchema.findOne({
            guildId: interactionGuildId,
          });

          const editChannelDescription = mustache.render(
            ru.embeds.logChannel.description.editedChannel,
            {
              interactionChannelId: interactionChannel.id,
            }
          );

          const installedChannelDescription = mustache.render(
            ru.embeds.logChannel.description.installedChannel,
            {
              interactionChannelId: interactionChannel.id,
            }
          );
          const embedColor = botConfig.embedColors.success;

          if (logChannel) {
            logChannel.channelId = interactionChannel.id;
            logChannel.guildId = interactionGuildId;
            await logChannel.save();
            await interaction.reply({
              embeds: [
                embedSetup(
                  undefined,
                  editChannelDescription,
                  undefined,
                  embedColor
                ),
              ],
              ephemeral: true,
            });
            return;
          }

          const newChannelId = new logChannelSchema({
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
        }
        break;
    }
  },
};
