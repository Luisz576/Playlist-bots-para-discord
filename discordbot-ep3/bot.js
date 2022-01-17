//Configs
const { token, commandPreffix } = require('./configs.json')
const { command_not_founded } = require('./messages.json')

//Imports
const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

//Client
const client = new Discord.Client()

//Cria commands
client.commands = new Discord.Collection()
//Pega os comandos
const commandsFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter(filename => filename.endsWith('.js'))
for(let filename of commandsFiles){
    const cmd = require(`./commands/${filename}`)
    client.commands.set(cmd.name, cmd)
}

//Ready
client.on('ready', () => {
    console.log("Logado com sucesso")
})

//Message
client.on('message', msg => {
    const message = msg.content.split(' ')
    const commandWithPreffix = message.shift()
    if(commandWithPreffix.startsWith(commandPreffix))
        try {
            client.commands.get(commandWithPreffix.slice(commandPreffix.length).toLocaleLowerCase()).executeCommand(client, msg, message) //Da erro caso não tenha o comando
        }catch (e){ //Caso de erro ele manda mensagem padrão de não achou comando
            msg.reply(command_not_founded)
        }
})

//Login
client.login(token)