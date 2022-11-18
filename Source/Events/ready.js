const { Events, ActivityType } = require("discord.js");
const botConfig = require("../../Config/botConfig");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setActivity(botConfig.Presence.activity, {
      type: ActivityType.Watching,
    });
    client.user.setStatus(botConfig.Presence.status);

    console.log(`[ ЛОГИРОВАНИЕ ] Бот ${client.user.tag} запущен!`);
  },
};
