const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const command = new Schema({
  commandName: reqString,
  commandId: reqString,
});

module.exports = model("command", command);
