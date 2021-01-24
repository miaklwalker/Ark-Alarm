
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const dotenv =  require('dotenv').config()
const client = new Client();
const Cluster = require('./cluster')

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
beardedGamer.watchPlayer('Vex');
beardedGamer.watchPlayer('JacktheRipper')

exports.beardedGamer = beardedGamer;

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISC_TOKEN);
})();

