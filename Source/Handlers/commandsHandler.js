const fileSystem = require("fs");
const path = require("path");

module.exports = (client, sourcePath) => {
  client.commandsHandler = async () => {
    const { commands, commandsArray } = client;
    const commandsPath = path.join(sourcePath, "Commands");
    const commandsFiles = fileSystem
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandsFiles) {
      const commandPath = path.join(commandsPath, file);
      const command = require(commandPath);
      commands.set(command.data.name, command);
      commandsArray.push(command.data.toJSON());
    }
  };
};
