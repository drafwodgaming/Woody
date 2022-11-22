const canvacord = require("canvacord");
const { Events, AttachmentBuilder } = require("discord.js");
const memberCardBackground = require("../../Config/memberCardBackground");
const mustache = require("mustache");
const ru = require("../../Config/ru");
const welcomeChannelSchema = require("../Models/channelId");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const interactionChannelId = await welcomeChannelSchema.findOne({
      guildId: member.guild.id,
    });
    const channelWelcome = member.guild.channels.cache.find(
      (channel) => channel.id === interactionChannelId.channelId
    );

    const randomIndex = Math.floor(Math.random() * memberCardBackground.length);

    const welcomeCard = new canvacord.Welcomer()
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setColor(ru.memberCard.title, ru.memberCard.color.main)
      .setColor(ru.memberCard.userNameBox, ru.memberCard.color.userBox)
      .setAvatar(
        member.user.displayAvatarURL({
          format: ru.bot.filePath.pngFileExtension,
        })
      )
      .setBackground(memberCardBackground[randomIndex]);

    const attachment = new AttachmentBuilder(await welcomeCard.build(), {
      name: ru.memberCard.attachment.welcome,
    });

    channelWelcome.send({ files: [attachment] });
  },
};
