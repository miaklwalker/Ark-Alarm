const BaseCommand = require('../../utils/structures/BaseCommand');
const Gamedig = require('gamedig');
const Cluster = require('../../cluster')

const beardedGamer = new Cluster("arkse","209.243.19.240");

beardedGamer.addServer("27029");
beardedGamer.addServer("27025");
beardedGamer.addServer("27023");
beardedGamer.addServer("27015");
beardedGamer.addServer("27017");
beardedGamer.addServer("27021");
beardedGamer.addServer("27019");
beardedGamer.addServer("27033");

beardedGamer.watchPlayer('123');
beardedGamer.watchPlayer('red');
beardedGamer.watchPlayer('JacktheRipper')

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('', 'testing', []);
  }

  async run(client, message, args) {
    beardedGamer.scanHostiles()
    .then(data=> message.channel.send("`" + data + "`"))

  }
}