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

    id: reqNum,
    user: reqStr,
    userID: reqNum,
    capital: reqNum,
    unrealisedProfit: reqNum,
    realisedProfit: reqNum,

})

module.exports = mongoose.model('users', userSchema)