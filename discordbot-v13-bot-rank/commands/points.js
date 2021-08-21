const Database = require('../services/database')

//execute command
async function execute(_bot, msg, _args){
    const author = msg.author
    //isn't registered
    if(await Database.getPoints(author.id) < 0)
        //if not: register
        await Database.registerNewMember(author.id)
    //get points
    const points = await Database.getPoints(author.id)
    //send message
    msg.reply(`Você tem ${points} pontos!`)
}

//command estructure
module.exports = {
    "name": "points",
    "help": "Mostra os seus pontos",
    execute
}