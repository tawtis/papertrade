const mongoose = require('mongoose')

const incSchema = mongoose.Schema({

  _id: String,
	sequence_value: Number

})

module.exports = mongoose.model('inc', incSchema)