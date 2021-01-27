const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require("fs");
const Cluster = require("../../cluster");


function buildCluster (guildName){
  let {game,ip,maps,enemies} = JSON.parse(fs.readFileSync("./config.json"))[guildName];
  let guildCluster = new Cluster(game,ip);
  Object.values(maps).forEach(map=>{
    if(map){guildCluster.addServer(map)}
  });
  guildCluster.enemies = enemies
  return guildCluster;
}


module.exports = class ShowHostile extends BaseCommand {
  constructor() {
    super('', '', []);
  }

  async run(client, message, args) {
    let cluster = buildCluster(message.guild.name);
    cluster.scanHostiles()
    .then(data => message.channel.send("```" + data + "```"))

  }
}