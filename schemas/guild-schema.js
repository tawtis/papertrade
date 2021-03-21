const mongoose = require('mongoose')
const reqNum = {type: Number,required: true,}
const guildSchema = mongoose.Schema({guildID: reqNum}) 
module.exports = mongoose.model('guilds', guildSchema)

