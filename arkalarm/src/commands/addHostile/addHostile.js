const BaseCommand = require('../../utils/structures/BaseCommand');
const config = require("../../config");

module.exports = class addHostile extends BaseCommand {
    constructor() {
      super('add', 'addHosile', []);
    }
  
    async run(client, message, args) {
      if(args.length === 1){
        config.addEnemy("./src/config.json",args[0])
        message.channel.send(`${args} was added!`);
      }else{
        message.channel.send("Please add new enemies by typing '!A add [steam username]")
      }
    }
  }