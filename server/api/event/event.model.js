import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
  eventId: String,
  event: String,
  place: String,
  start_time: String
})

module.exports = mongoose.model('Event', eventSchema)
