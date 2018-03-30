import mongoose from 'mongoose'

const pageSchema = mongoose.Schema({
  id: String,
  name: String
})

module.exports = mongoose.model('Page', pageSchema)
