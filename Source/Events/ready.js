const { Events } = require("discord.js");
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
          ru.logs.success.title.dbTitle,
          ru.logs.success.body.dbConnected
        )
      )
      .catch((error) => console.log(ru.logs.errors.title, error));

    client.user.setPresence({
      status: botConfig.bot.presence.status,
      activities: [
        {
          name: botConfig.bot.presence.activity,
          type: botConfig.bot.presence.type,
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
