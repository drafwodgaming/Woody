const { Schema, model } = require("mongoose");

const welcomeChannelId = new Schema({
  channelId: String,
  guildId: String,
  guildName: String,
});

module.exports = model("WelcomeChannelID", welcomeChannelId);
