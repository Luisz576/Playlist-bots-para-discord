const { commandPreffix } = require('../configs.json')

function executeCommand(bot, msg, _message){
    let msgHelp = '=====> **Comandos** <====='
    //passa por todos os comandos
    bot.commands.forEach(command => {
        if(command.help && command.name)
            msgHelp += `\n**${commandPreffix}${command.name}**: ${command.help}` //Pega o nome e o help
    });
    msgHelp += "\n== Desenvolvido por **Luisz576** ==" //Desenvolvedor
    return msg.channel.send(msgHelp)
}

module.exports = {
    name: "help",
    help: "Mostra todos os comandos que eu tenho",
    executeCommand
}