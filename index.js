import DiscordJS, { Intents, MessageManager } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'

let leObject = {"servername": "", "username": "", "message": "", "isbot": ""}
let permCheck, permObj

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

client.on('ready', () => {
    console.log("ready to look at messages 24/7")
})

client.on('messageCreate', async (message) => {
    permCheck = fs.readFileSync('./perm.json').toString()
    permObj = JSON.parse(permCheck)

    if (!permObj.exclusionList.includes(message.author.id)){
        console.log("servername: " + message.guild.name)
        console.log("username: " + message.author.username);
        console.log("message: " + message.content)
        console.log("is bot: " + message.author.bot +"\n")

        leObject.servername = message.guild.name;
        leObject.username = message.author.username;
        leObject.message = message.content;
        leObject.isbot = message.author.bot;
        let lePlaystationFive = JSON.stringify(leObject) 
        fs.writeFileSync("store.json", lePlaystationFive)
        
    } else { 
        console.log("this user is on the exclusion list")
    }
})

client.login(process.env.TOKEN)