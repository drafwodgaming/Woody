const fileSystem = require("fs");
const path = require("path");
const ru = require("../../Config/ru");

module.exports = (client, sourcePath) => {
  client.commandsHandler = async () => {
    const { commands, commandsArray } = client;
    const commandsPath = path.join(sourcePath, ru.bot.filePath.commandsPath);
    const commandsFiles = fileSystem
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(ru.bot.filePath.jsFileExtension));

    for (const file of commandsFiles) {
      const commandPath = path.join(commandsPath, file);
      const command = require(commandPath);
      commands.set(command.data.name, command);
      commandsArray.push(command.data.toJSON());
    }
  };
};
