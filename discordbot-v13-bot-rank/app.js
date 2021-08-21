//imports of bot
const tokens = require('./tokens.json')
const { commands_prefix, no_command_message } = require('./bot_configs.json')
const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const Database = require('./services/database')

//database setup
Database.setup()

//creating the bot
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })

//loading bot commands
bot.commands = new Discord.Collection()
const commandsFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter(filename => filename.endsWith('.js'))
for(let filename of commandsFiles){
    const cmd = require(`./commands/${filename}`)
    bot.commands.set(cmd.name, cmd)
}

//message event
bot.on('messageCreate', msg => {
    //message validations
    if(msg.author.bot) return
    if(msg.author.id === bot.user.id) return
    //is a command
    if(msg.content.startsWith(commands_prefix)){
        const cmd = msg.content.split(' ')[0].replace(commands_prefix, '')
        const cmdArgs = msg.content.split(' ').slice(1)
        //verify if the command exists
        if(bot.commands.has(cmd))
            //execute the command
            bot.commands.get(cmd).execute(bot, msg, cmdArgs)
        else
            //no command founded
            msg.reply(no_command_message.replace('<help_command>', `${commands_prefix}help`))
    }
})

//ready
bot.on('ready', () => {
    console.log(`Logado`)
})

//bot login
bot.login(tokens.discord_bot_token)