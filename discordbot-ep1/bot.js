const { token } = require('./configs.json')
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Logado")
})

client.on('message', msg => {
    const message = msg.content
    if(message.toLowerCase().startsWith("+@hello"))
        msg.reply("Hello World!")
})

client.login(token)