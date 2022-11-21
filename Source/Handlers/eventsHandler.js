const fileSystem = require("fs");
const path = require("path");
const ru = require("../../Config/ru");

module.exports = (client, sourcePath) => {
  client.eventsHandler = async () => {
    const eventsPath = path.join(sourcePath, ru.bot.filepath.eventsPath);
    const eventsFiles = fileSystem
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(ru.bot.filepath.jsFileExtension));

    for (const file of eventsFiles) {
      const eventPath = path.join(eventsPath, file);
      const event = require(eventPath);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};
