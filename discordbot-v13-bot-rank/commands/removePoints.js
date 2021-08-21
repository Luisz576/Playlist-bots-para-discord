const { executeChangeOfPoints } = require('./addpoints')

//execute command
async function execute(_bot, msg, args){
    return await executeChangeOfPoints(msg, args, true)
}

//command estructure
module.exports = {
    "name": "removepoints",
    "help": "Remove pontos de alguém caso você tenha a permissão necessária",
    execute
}