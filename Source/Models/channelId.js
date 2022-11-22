const { Schema, model } = require("mongoose");

const channelId = new Schema({
  channelId: String,
  guildId: String,
});

module.exports = model("ChannelId", channelId);
