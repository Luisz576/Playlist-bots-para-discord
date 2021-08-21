const tokens = require('../tokens.json')
const mongoose = require('mongoose')
const Member = require('../models/member')

//setup
function setup(){
    mongoose.connect(tokens.mongo_db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

//register new member
function registerNewMember(memberId){
    return new Promise(async (resolve) => {
        //try to get member
        let member = await Member.findOne({ memberId })
        if(!member) member = await Member.create({ points: 0, memberId })
        resolve(member)
    })
}

//setPoints
function modifyPoints(memberId, points){
    return new Promise(async (resolve) => {
        //get member
        let member = await Member.findOne({ memberId })
        //if hasn't member
        if(!member)
            //register
            member = await registerNewMember(memberId)
        //if has member
        if(member){
            member.points += points
            await member.save()
            resolve(true)
        }
        //else create a new member with the points
        else resolve(false)
    })
}

//getPoints
function getPoints(memberId){
    return new Promise(async (resolve) => {
        //get member
        let member = await Member.findOne({ memberId })
        //if has member return the points of the member
        if(member) resolve(member.points)
        //else return -1
        else resolve(-1)
    })
}

function getAllMembers(){
    return new Promise(((resolve, reject) => {
        try{
            //getting all members of mongodb
            Member.find({}, (err, members) => {
                if(err) throw err
                resolve(members)
            })
        }catch(e){
            reject(e)
        }
    }))
}

//the database
module.exports = {
    setup,
    registerNewMember,
    modifyPoints,
    getPoints,
    getAllMembers
}