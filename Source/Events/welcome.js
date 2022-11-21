const canvacord = require("canvacord");
const { Events, AttachmentBuilder } = require("discord.js");
const memberCardBackground = require("../../Config/memberCardBackground");
const mustache = require("mustache");
const ru = require("../../Config/ru");
const { embedSetup } = require("../Functions/embedSetup");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, interaction) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.id === "1042892281776185431"
    );

    if (!channel) return;

    const randomIndex = Math.floor(Math.random() * memberCardBackground.length);

    const welcomeCard = new canvacord.Welcomer()
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setColor(ru.memberCard.title, ru.memberCard.color.main)
      .setColor(ru.memberCard.userNameBox, ru.memberCard.color.main)
      .setColor(ru.memberCard.discriminatorBox, ru.memberCard.color.main)
      .setColor(ru.memberCard.messageBox, ru.memberCard.color.main)
      .setColor(ru.memberCard.border, ru.memberCard.color.border)
      .setColor(ru.memberCard.avatar, ru.memberCard.color.border)
      .setAvatar(
        member.user.displayAvatarURL({
          format: ru.bot.filePath.pngFileExtension,
        })
      )
      .setBackground(memberCardBackground[randomIndex]);

    const attachment = new AttachmentBuilder(await welcomeCard.build(), {
      name: ru.memberCard.attachment.welcome,
    });

    channel.send({
      content: mustache.render(ru.memberCard.content.welcome, {
        memberId: member.id,
      }),
      files: [attachment],
    });
    await embedSetup("", member, "", "", "");
  },
};
