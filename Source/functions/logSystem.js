const logChannelSchema = require("../Models/logChannel");

function logChannel(member) {
  const interactionChannelId = logChannelSchema.findOne({
    guildId: member.guild.id,
  });
}

module.exports = { logChannel };
