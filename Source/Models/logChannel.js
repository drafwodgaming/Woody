const { Schema, model } = require("mongoose");

const logChannel = new Schema({
  channelId: String,
  guildId: String,
});

module.exports = model("LogChannelID", logChannel);
