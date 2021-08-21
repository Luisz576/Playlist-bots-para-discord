const { admin_role } = require('../bot_configs.json')
const Database = require('../services/database')

//execute command
async function execute(_bot, msg, args){
    return await executeChangeOfPoints(msg, args)
}

async function executeChangeOfPoints(msg, args, remove = false){
    const author = msg.author
    //see if author has the role
    if(msg.guild.members.cache.get(author.id).roles.cache.get(admin_role)){
        //has passed the arguments
        if(args.length >= 2){
            const targetId = args[0].replace('<', '').replace('@', '').replace('>', '')
            const pointsToModify = Number(args[1])
            //validate arguments
            if((!isNaN(pointsToModify))){
                //see if target exists
                const target = msg.guild.members.cache.get(targetId)
                if(target){
                    //modify points
                    if(await Database.modifyPoints(`${target.id}`, pointsToModify * (remove ? -1 : 1)))
                        return msg.reply(`Pontos de ${target.user.username} alterados!`)
                    return msg.reply('Não foi possível alterar os pontos de ${targetUsername}!')
                }
                return msg.reply('Alvo não encontrado!')
            }
            return msg.reply('Parâmetros inválidos!')
        }
        return msg.reply('Passe o username do membro que é o alvo e a quantidade de pontos!')
    }
    return msg.reply(`Você não tem permissão para usar esse comando!`)
}

//command estructure
module.exports = {
    "name": "addpoints",
    "help": "Adiciona pontos de alguém caso você tenha a permissão necessária",
    execute,
    executeChangeOfPoints
}