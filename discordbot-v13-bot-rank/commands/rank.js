const Database = require('../services/database')

//execute command
async function execute(_bot, msg, _args){
    const author = msg.author
    //get all members
    Database.getAllMembers().then(async (members) => {
        let rank = 1
        const authorPoints = await Database.getPoints(author.id)
        members.forEach(async (member) => {
            //if this member isn't the author
            if(member.memberId != author.id)
                //if this member has more points of the author
                if(member.points > authorPoints)
                    //increase the rank
                    rank++
        })
        //send the rank
        msg.reply(`${author.username} **#${rank}**`)
    }).catch(err => console.log(err))
}

//command estructure
module.exports = {
    "name": "rank",
    "help": "Mostra o seu rank no servidor",
    execute
}