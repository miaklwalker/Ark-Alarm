const fs = require("fs");

class config {
    addMember(name){
        fs.readFile('config.json',(err,data)=>{
            if(err)throw err;
            let serverData = JSON.parse(data);
            serverData.tribe.members.push(name);
            fs.writeFile('config.json',JSON.stringify(serverData,null,2),err=>{
                if(err)throw err;
                console.log("Data was written")
            })
            console.log(serverData);
        })
    }
    addEnemy(name){
        fs.readFile('config.json',(err,data)=>{
            if(err)throw err;
            let serverData = JSON.parse(data);
            serverData.enemies.push(name);
            fs.writeFile('config.json',JSON.stringify(serverData,null,2),err=>{
                if(err)throw err;
                console.log("Data was written")
            })
            console.log(serverData);
        })
    }
    removeTribe(){}
    removeEnemy(){}
}

fs.readFile('config.json',(err,data)=>{
    if(err)throw err;
    let serverData = JSON.parse(data);
    serverData.tribe.members.push("ouisihai");
    fs.writeFile('config.json',JSON.stringify(serverData,null,2),err=>{
        if(err)throw err;
        console.log("Data was written")
    })
    console.log(serverData);
})

