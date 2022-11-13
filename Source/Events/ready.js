const { Events, ActivityType } = require("discord.js");
const botConfig = require("../../Config/botConfig");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setActivity(botConfig.activity, { type: ActivityType.Playing });
    console.log(`[ЛОГИ] Бот ${client.user.tag} готов!`);
  },
};
