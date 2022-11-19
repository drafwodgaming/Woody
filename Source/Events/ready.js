const { Events } = require("discord.js");
const { Presence } = require("../../Config/botConfig");
const botConfig = require("../../Config/botConfig");
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await mongoose
      .connect(botConfig.monoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() =>
        console.log(
          chalk.green("[DATABASE STATUS]:"),
          chalk.blackBright("Connected.")
        )
      )
      .catch((error) => console.log(chalk.redBright(`[ ERROR ] ${error}`)));
    client.user.setPresence({
      status: Presence.status,
      activities: [
        {
          name: Presence.activity,
          type: Presence.type,
        },
      ],
    });
    const clientData = [
      {
        Name: client.user.tag,
        Servers: client.guilds.cache.size,
        Channels: client.channels.cache.size,
        Status: Presence.status,
      },
    ];
    console.table(clientData);
  },
};
