const { Events, ActivityType } = require("discord.js");
const botConfig = require("../../Config/botConfig");
const { Presence } = require("../../Config/botConfig");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    let servers = await client.guilds.cache.size;

    client.user.setPresence({
      status: Presence.status,
      activities: [
        {
          name: Presence.activity,
          type: Presence.type,
        },
      ],
    });

    console.log(`[ ЛОГИРОВАНИЕ ] Бот ${client.user.tag} запущен!`);
  },
};
