const BaseCommand = require('../../utils/structures/BaseCommand');
const {beardedGamer} = require("../../index")

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('', '', []);
  }

  async run(client, message, args) {
    beardedGamer.scanHostiles()
    .then(data=> {
      message.channel.send("`" + data + "`")
    })

  }
}