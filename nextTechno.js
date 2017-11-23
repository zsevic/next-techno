const Event = require('./app/models/event')
const async = require('async')
const request = require('request')

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
          let datetime = Date.parse(res[i].start_time)
          if (today > datetime) {
            break
          } else if (ids.indexOf(res[i].id) > -1) {
            continue
          } else {
            ids.push(res[i].id)
            let temp = {
              eventId: res[i].id,
              event: res[i].name,
              place: res[i].place === undefined ? 'N/A' : res[i].place.name,
              start_time: res[i].start_time
            }
            arr.push(temp)
            let newEvent = new Event(temp)
            newEvent.save()
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
