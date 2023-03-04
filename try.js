import axios from 'axios'
import fs from 'node:fs';

let store = fs.readFileSync("./store.json").toString();
let compare = fs.readFileSync("./compare.json").toString();
let perm = fs.readFileSync("./perm.json").toString() //config file (not sure why it's called perm)

//console.log(`store.json: ${store}`)
//console.log(`compare.json: ${compare}`)
//console.log(`perm.json: ${perm}`)

if (store != compare){
    let storeObj = JSON.parse(store)
    let permObj = JSON.parse(perm) 

    console.log(`isBot: ${storeObj.isbot}`)
    console.log(`excludeBot: ${permObj.excludeBot}`)

    if (permObj.excludeBot && storeObj.isbot){
        console.log("is bot, not sending")
    } else {
        console.log(`\nSending message\n`)
        fs.writeFileSync("./compare.json", store)
        let messageSend = `${storeObj.message}`;
        let titleSend = `${storeObj.username} (${storeObj.channel})`;
        
        const url = permObj.goURL;
        const bodyFormData = {
            title: titleSend,
            message: messageSend,
            priority: 5,
            extras: {
                "client::notification": {
                    click: { url: storeObj.url },  //Clicking on the notification will redirects to that message in Discord app
                },
            },
        };

        axios({
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        url: url,
        data: bodyFormData,
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err.response ? err.response.data : err));
    }   
}
