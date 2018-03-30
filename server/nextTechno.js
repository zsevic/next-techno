const Event = require('./api/event/event.model')
const async = require('async')
const request = require('request')

function registerEvent (ids, res, arr) {
  ids.push(res.id)
  let temp = {
    eventId: res.id,
    name: res.name,
    place: res.place === undefined ? 'N/A' : res.place.name,
    start_time: res.start_time
  }
  arr.push(temp)
  let newEvent = new Event(temp)
  newEvent.save()
  return 0
}

function checkForEvents (ids, res, arr, name) {
  res.name = res.name ? res.name : name
  let today = Date.now()
  let startTime = Date.parse(res.start_time)
  if (ids.indexOf(res.id) > -1) {
    return 1 // continue
  } else if (today > startTime) {
    if (res.end_time && today < Date.parse(res.end_time)) {
      registerEvent(ids, res, arr)
    } else {
      return -1 // break
    }
  } else {
    return registerEvent(ids, res, arr) // 200
  }
}

module.exports = (pages, token, done) => {
  const arr = []
  const ids = []
  let giveMeData = (page, cb) => {
    let access = `https://graph.facebook.com/v2.10/${
      page.id
    }/events?access_token=${token}`
    request(access, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const res = JSON.parse(body).data
        for (let i = 0; i < res.length; i++) {
          if (res[i].event_times) {
            res[i].event_times.forEach(event => {
              event.name = res[i].name
              event.place = res[i].place
              checkForEvents(ids, event, arr)
            })
          } else {
            let result = checkForEvents(ids, res[i], arr)
            if (result === 1) {
              continue
            } else if (result === -1) {
              break
            }
          }
        }
        return cb(null)
      } else {
        cb(error)
      }
    })
  }
  async.each(pages, giveMeData, err => {
    if (err) {
      done(err)
    }
    done(null, arr)
    console.log('everything went okay!')
  })
}
