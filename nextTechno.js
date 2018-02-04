const Event = require('./app/models/event')
const async = require('async')
const request = require('request')

function registerEvent (ids, res, arr) {
  ids.push(res.id)
  let temp = {
    eventId: res.id,
    event: res.name,
    place: res.place === undefined ? 'N/A' : res.place.name,
    start_time: res.start_time
  }
  arr.push(temp)
  let newEvent = new Event(temp)
  newEvent.save()
}

module.exports = (pages, token, done) => {
  const arr = []
  const ids = []
  let today = Date.now()
  let giveMeData = (page, cb) => {
    let access = `https://graph.facebook.com/v2.9/${page.id}/events?access_token=${token}`
    request(access, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const res = JSON.parse(body).data
        for (let i = 0; i < res.length; i++) {
          let startTime = Date.parse(res[i].start_time)
          if (ids.indexOf(res[i].id) > -1) {
            continue
          } else if (today > startTime) {
            if (res[i].end_time) {
              let endTime = Date.parse(res[i].end_time)
              if (today < endTime) {
                registerEvent(ids, res[i], arr)
              } else {
                break
              }
            } else {
              break
            }
          } else {
            registerEvent(ids, res[i], arr)
          }
        }
        return cb(null)
      } else {
        cb(error)
      }
    })
  }
  async.each(pages, giveMeData, (err) => {
    if (err) { done(err) }
    done(null, arr)
    console.log('everything went okay!')
  })
}
