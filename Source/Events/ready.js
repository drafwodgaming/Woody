const { Events, ActivityType } = require("discord.js");
const { Presence } = require("../../Config/botConfig");
const botConfig = require("../../Config/botConfig");
const mongoose = require("mongoose");
const chalk = require("chalk");
const ru = require("../../Config/ru");

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
          chalk.blue(ru.logs.success.title.dbTitle),
          chalk.black(ru.logs.success.body.dbConnected)
        )
      )
      .catch((error) =>
        console.log(chalk.redBright(ru.logs.errors.title)`${error}`)
      );

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
      },
    ];
    console.table(clientData);
  },
};
