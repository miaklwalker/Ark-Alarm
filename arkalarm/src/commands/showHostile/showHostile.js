const BaseCommand = require('../../utils/structures/BaseCommand');
const {beardedGamer} = require("../../index");

module.exports = class addHostile extends BaseCommand {
    constructor() {
      super('list', 'addHosile', []);
    }
  
    async run(client, message, args) {
        message.channel.send(`${beardedGamer.hostiles}`);
    }
  }