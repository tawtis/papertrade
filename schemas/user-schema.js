const mongoose = require('mongoose')

const reqStr = {
  type: String,
  required: true,
}
const reqNum = {
  type: Number,
  required: true,
}


const userSchema = mongoose.Schema({

    user: reqStr,
    userID: reqNum,
    capital: reqNum,
    unrealisedProfit: Number,
    realisedProfit: Number,

})

module.exports = mongoose.model('users', userSchema)