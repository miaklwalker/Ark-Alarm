const Server = require('./servers')
const Gamedig = require('gamedig');
const fs = require("fs");

const message = (name,activePlayers,online,hostiles) =>`${name}:
players : ${activePlayers.length > 0 ? online : "The server is empty"}
hostiles : ${hostiles}

`
const safeMessage = (name,activePlayers) => `${name}:
                players : ${activePlayers.length > 0 ? activePlayers : "The server is empty"}

`
module.exports = class Cluster {
    constructor(type,host){
        this.type = type;
        this.host = host;
        this._servers = [];
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
    async scanHostiles(){
        let mapData = await this.checkCluster();
        let {enemies} = this;
        return mapData
        .map(map=>{
            const {map:name,players:activePlayers} = map;
            let hasHostile = enemies.map(hostile=>activePlayers.includes(hostile)).includes(true);
            if(hasHostile){
                let online = activePlayers.filter(player=>
                    !enemies
                    .map(enemy=>enemy === player)
                    .includes(true));

                let hostiles = activePlayers.filter(player=>
                    enemies
                    .map(enemy=>enemy === player )
                    .includes(true)
                    )

                return message(name,activePlayers,online,hostiles);
                }else{
                return safeMessage(name,activePlayers);
            }
        })
    }
}