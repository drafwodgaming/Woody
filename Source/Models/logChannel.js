const { Schema, model } = require("mongoose");

const logChannel = new Schema({
  channelId: String,
  guildId: String,
  guildName: String,
});

module.exports = model("LogChannelID", logChannel);
