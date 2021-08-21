const Database = require('../services/database')

//execute command
async function execute(_bot, msg, args){
    if(args.length >= 1){
        const targetId = args[0].replace('<', '').replace('@', '').replace('>', '')
        //see if has member on guild
        const member = msg.guild.members.cache.get(targetId)
        if(member){
            if(member.user.bot)
                return msg.reply('Esse usuário é um bot!')
            if(await Database.getPoints(member.id) < 0){
                if(await Database.registerNewMember(member.id))
                    return msg.reply(`Usuário **@${member.user.username}** inicialidado por **@${msg.author.username}**`)
                return msg.reply(`Não foi possível inicializar esse usuário!`)
            }
            return msg.reply('Usuário já inicializado!')
        }
        return msg.reply(`Usuário não encontrado!`)
    }
    return msg.reply('Informe o membro que será inicializado!')
}

//command estructure
module.exports = {
    "name": "setup",
    "help": "Inicia um membro",
    execute
}