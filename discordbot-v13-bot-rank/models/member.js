const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    memberId: String,
    points: Number
})

module.exports = mongoose.model('Member', MemberSchema)