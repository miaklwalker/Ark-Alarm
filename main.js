const Gamedig = require('gamedig');

class Server {
    constructor(type,host,port){
        this.type = "arkse";
        this.host = "209.243.19.240";
        this.port = port;
    }
}
class Cluster {
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
            let {players:p,name,map,raw:{numplayers}}  = await Gamedig.query(server);
            let players = p.map(obj=>obj.name).filter(name=>name!==undefined);
            let serverOutput = {name,map,numplayers,players}
            this.clusterInfo.push(serverOutput);
        }
        return this.clusterInfo;
    }
    watchPlayer(id){
        this.hostiles.push(id);
    }
    async scanHostiles(){
        //scan each server for enemies
        // if found log out server name and the enemy found
        let mapData = await this.checkCluster();
        return mapData.map(map=>{
            let activePlayers = map.players;
            let hasHostile = this.hostiles
            .map(hostile=>activePlayers.includes(hostile))
            .includes(true);
            if(hasHostile){
                return {name:map.name,hasHostile}
            }else{
                return hasHostile;
            }
        })
    }
}
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


beardedGamer.scanHostiles()
.then(data=>console.log(data))


