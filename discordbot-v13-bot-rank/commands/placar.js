const Database = require('../services/database')

//execute command
function execute(_bot, msg, _args){
    Database.getAllMembers().then(members => {
        let placarMessage = "===== **PLACAR** ====="
        //system to sort members
        members.sort((a, b) => {
            if(a.points > b.points) return -1
            if(a.points < b.points) return 1
            return 0
        })
        let counter = 1
        members.forEach(member => {
            if(counter <= 5)
                placarMessage += `\n**#${counter}** <@${member.memberId}> - ${member.points} pts`
            counter++
        })
        return msg.reply(placarMessage)
    })
}

//command estructure
module.exports = {
    "name": "placar",
    "help": "Mostra os 5 ranks mais altos",
    execute
}