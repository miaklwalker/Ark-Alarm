const BaseCommand = require('../../utils/structures/BaseCommand');
const {beardedGamer} = require("../../index");

module.exports = class addHostile extends BaseCommand {
    constructor() {
      super('add', 'addHosile', []);
    }
  
    async run(client, message, args) {
        beardedGamer.watchPlayer(args);
        message.channel.send(`${args} was added!`);
    }
  }