const fs = require("fs");

const config = {
    addMember(url,name){
        fs.readFile(url,(err,data)=>{
            if(err)throw err;
            let serverData = JSON.parse(data);
            serverData.tribe.members.push(name);
            fs.writeFile('config.json',JSON.stringify(serverData,null,2),err=>{
                if(err)throw err;
                console.log("Data was written")
            })
            console.log(serverData);
        })
    },
    addEnemy(url,name){
        fs.readFile(url,(err,data)=>{
            if(err)throw err;
            let serverData = JSON.parse(data);
            serverData.enemies.push(name);
            fs.writeFile('config.json',JSON.stringify(serverData,null,2),err=>{
                if(err)throw err;
                console.log("Data was written")
            })
            console.log(serverData);
        })
    },
    removeTribe(url,name){
        fs.readFile(url,(err,data)=>{
            if(err)throw err;
            let serverData = JSON.parse(data);
            serverData.tribe.members = serverData.tribe.members.filter(handle=>handle !== name);
            fs.writeFile(url,JSON.stringify(serverData,null,2),err=>{
                if(err)throw err;
                console.log("Data was written")
            })
            console.log(serverData);
        })
    },
    removeEnemy(url,name){
        fs.readFile(url,(err,data)=>{
            if(err)throw err;
            let serverData = JSON.parse(data);
            serverData.enemies = serverData.enemies.filter(handle=>handle !== name);
            fs.writeFile(url,JSON.stringify(serverData,null,2),err=>{
                if(err)throw err;
                console.log("Data was written")
            })
            console.log(serverData);
        })
    }
}

module.exports = config;

