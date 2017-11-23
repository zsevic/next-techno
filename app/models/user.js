const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    lastUpdated: Date
  }
})

module.exports = mongoose.model('User', userSchema)
