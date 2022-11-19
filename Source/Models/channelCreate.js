const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const channel = new Schema({
  guildId: reqString,
  channelId: reqString,
});

module.exports = model("channel", channel);
