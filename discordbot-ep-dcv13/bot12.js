const { token } = require('./configs.json')
const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', () => {
    console.log("Logado")
})

bot.on('message', msg => {
    const message = msg.content
    if(message.toLowerCase().startsWith("+@hello"))
        msg.reply("Hello World!")
})

bot.login(token)