const mongoose = require("mongoose");

const antiLink = new mongoose.Schema({
  GuildId: String,
});

module.exports = model("AntiLink", antiLink);
