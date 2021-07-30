const { token } = require('./configs.json')
const Discord = require('discord.js')
const client = new Discord.Client()

const channelsBVEI = {}

client.on('ready', () => {
    console.log("Logado com sucesso")
})

client.on('message', msg => {
    if(msg.content.toLocaleLowerCase().startsWith('+@bvei')){
        channelsBVEI[msg.guild.name] = msg.channel
        msg.reply('Channel setado com sucesso!')
    }
})

client.on('guildMemberAdd', member => {
    if(channelsBVEI[member.guild.name])
        channelsBVEI[member.guild.name].send(`Seja bem vindo(a), <@${member.user.id}>! :)`)
})

client.on('guildMemberRemove', member => {
    if(channelsBVEI[member.guild.name])
        channelsBVEI[member.guild.name].send(`<@${member.user.id}> saiu do servidor! :(`)
})

client.login(token)