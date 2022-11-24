const { Client, REST, Routes, Collection } = require("discord.js");
const botConfig = require("../Config/botConfig");
const botIntents = require("../Config/botIntents");
const fileSystem = require("fs");
const path = require("path");
const ru = require("../Config/ru");

const client = new Client({ intents: botIntents });
const rest = new REST({ version: botConfig.bot.restVersion }).setToken(
  botConfig.bot.tokenDev
);

client.commands = new Collection();
client.commandsArray = [];

const handlersPath = path.join(__dirname, ru.bot.filePath.handlersPath);
const handlersFiles = fileSystem
  .readdirSync(handlersPath)
  .filter((file) => file.endsWith(ru.bot.filePath.jsFileExtension));

for (const file of handlersFiles) {
  const filePath = path.join(handlersPath, file);
  require(filePath)(client, __dirname);
}

async function setUpBot() {
  client.eventsHandler();
  client.commandsHandler();
  client.login(botConfig.bot.tokenDev);

  await rest.put(Routes.applicationCommands(botConfig.bot.clientIdDev), {
    body: client.commandsArray,
  });
}

setUpBot().catch((error) => console.log(ru.logs.errors.title, error));
