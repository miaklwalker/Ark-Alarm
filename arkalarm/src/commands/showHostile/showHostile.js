const BaseCommand = require('../../utils/structures/BaseCommand');
const {beardedGamer} = require("../../index");
const fs = require("fs");

module.exports = class showHostile extends BaseCommand {
    constructor() {
      super('list', 'addHosile', []);
    }
  
    async run(client, message, args) {
        message.channel.send(`${JSON.parse(fs.readFileSync("./src/config.json")).enemies}`);
    }
  }