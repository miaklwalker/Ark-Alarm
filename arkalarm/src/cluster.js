const Server = require('./servers')
const Gamedig = require('gamedig');
const fs = require("fs");

module.exports = class Cluster {
    constructor(type,host){
        this.type = type;
        this.host = host;
        this._servers = [];
        this.hostiles = [];
    }
    get Servers () {
        return this._servers;
    }

    addServer (port) {
        this._servers.push(new Server(this.type,this.host,port))
    }

    async checkCluster(){
        this.clusterInfo = [];
        for(let i = 0 ; i < this._servers.length; i++ ){
            let server = this._servers[i];
            try{
                // Get server info from the steam api
                let {players:p,name,map,raw:{numplayers}}  = await Gamedig.query(server);
                // filter out the random empty player objects
                let players = p.map(obj=>obj.name).filter(name=>name!==undefined);
                
                let serverOutput = {name,map,numplayers,players};

                this.clusterInfo.push(serverOutput);
            }catch(err){
                console.log("A server is down")
            }

        }
        return this.clusterInfo;
    }

    watchPlayer(id){
        this.hostiles.push(id);
    }

    async scanHostiles(){
        let mapData = await this.checkCluster();
        let json = JSON.parse(fs.readFileSync("./src/config.json")).enemies;
        return mapData
        .map(map=>{
            let name = map.map;
            let activePlayers = map.players;
            let hasHostile = json.map(hostile=>activePlayers.includes(hostile)).includes(true);
            if(hasHostile){
            let hostiles = activePlayers
            .filter(player=>json.map(enemy=>enemy === player)
            .includes(true));
            return `
${name}:
players : ${activePlayers.length > 0 ? activePlayers : "The server is empty"}
Hostiles : ${hostiles}
`
            }else{
                return ` 
${name}:
players : ${activePlayers.length > 0 ? activePlayers : "The server is empty"}
`;
            }
        })
    }
}