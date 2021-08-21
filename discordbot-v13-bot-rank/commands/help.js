const { commands_prefix } = require('../bot_configs.json')

//execute command
function execute(bot, msg, _args){
    //create the help message
    let msgHelp = '=====> **Comandos** <====='
    //get the bot commands
    bot.commands.forEach(command => {
        if(command.help && command.name) //is a valid command
            //add the command to the message
            msgHelp += `\n**${commands_prefix}${command.name}**: ${command.help}`
    })
    //credits
    msgHelp += "\n== Desenvolvido por **Luisz576** =="
    //send the help message
    return msg.channel.send(msgHelp)
}

//command estructure
module.exports = {
    "name": "help",
    "help": "Mostra todos os comandos",
    execute
}