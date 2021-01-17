const Server = require('./servers')
const Gamedig = require('gamedig');

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
                let {players:p,name,map,raw:{numplayers}}  = await Gamedig.query(server);
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
        return mapData.map(map=>{
            let name = map.map;
            let activePlayers = map.players;
            let hasHostile = this.hostiles
            .map(hostile=>activePlayers.includes(hostile))
            .includes(true);
            let hostiles = activePlayers.filter(player=>{
                return this.hostiles.map(enemy=>{
                    return enemy === player
                })
                .includes(true);
            })
            if(hasHostile){
                return ` ${hostiles} is on ${name} `
            }else{
                
                return ` ${name} has no hostiles `;
            }
        })
    }
}