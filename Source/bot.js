const { Client, REST, Routes, Collection } = require("discord.js");
const botConfig = require("../Config/botConfig");
const botIntents = require("../Config/botIntents");
const fileSystem = require("fs");
const path = require("path");

const client = new Client({ intents: botIntents });
const rest = new REST({ version: botConfig.restVersion }).setToken(
  botConfig.tokedDev
);

client.commands = new Collection();
client.commandsArray = [];

const handlersPath = path.join(__dirname, "Handlers");
const handlersFiles = fileSystem
  .readdirSync(handlersPath)
  .filter((file) => file.endsWith(".js"));

for (const file of handlersFiles) {
  const filePath = path.join(handlersPath, file);
  require(filePath)(client, __dirname);
}

async function setUpBot() {
  client.eventsHandler();
  client.commandsHandler();
  client.login(botConfig.token);

  await rest.put(Routes.applicationCommands(botConfig.clientIdDev), {
    body: client.commandsArray,
  });
}

setUpBot().catch((error) => console.log(`[ ОШИБКА ] ${error}`));
