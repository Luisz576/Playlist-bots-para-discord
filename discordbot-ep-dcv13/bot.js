const { token } = require('./configs.json')
const { Client, Intents } = require('discord.js')
// const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

//PRECISA PELO MENOS DO NODE 16.6
//https://nodejs.org/en/

bot.on('ready', () => {
    console.log("Logado")
})

//message => messageCreate
bot.on('messageCreate', msg => {
    const message = msg.content
    if(message.toLowerCase().startsWith("+@hello"))
        msg.reply("Hello World!")
})

bot.login(token)