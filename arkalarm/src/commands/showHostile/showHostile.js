const BaseCommand = require('../../utils/structures/BaseCommand');
const fs = require("fs");
const Cluster = require("../../cluster");


function buildCluster (guildName,channelName){
  let {game,ip,maps,enemies} = JSON.parse(fs.readFileSync("./src/config.json"))[guildName][channelName];
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
    let channelName = message.channel.name;
    if(channelName.includes("ark-alarm")){
      let cluster = buildCluster(message.guild.name,channelName.split("-")[2]);
      cluster.scanHostiles()
      .then(data => message.channel.send("```" + data + "```"))
      .catch(err=>console.log("No Config File found"))
    }
  }
}