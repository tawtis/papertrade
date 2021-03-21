const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const reqNumber = {
  type: Number,
  required: true,
}

const userSchema = mongoose.Schema({

  ID: Number,
  User: String,
  UserID: Number,
  Capital: Number,
  Assets: String,

})

module.exports = mongoose.model('users', userSchema)
