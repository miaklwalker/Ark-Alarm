
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const dotenv =  require('dotenv').config();
const fs = require("fs");
const client = new Client();
const Cluster = require('./cluster')



let json = JSON.parse(fs.readFileSync("./src/config.json"));
const beardedGamer = new Cluster(json.game,json.ip);
Object.values(json.maps).forEach(map=>{
  if(map){beardedGamer.addServer(map)}
});

exports.beardedGamer = beardedGamer;

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISC_TOKEN);
})();

