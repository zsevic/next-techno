const request = require('request')

module.exports = (eventID, name, token, done) => {
  const access = `https://graph.facebook.com/v2.10/${eventID}/attending?fields=name,picture{url}&limit=500&access_token=${token}`
  const regex = new RegExp(' ?' + name + ' ')
  const arr = []
  const giveMeData = access => {
    request(access, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const paging = JSON.parse(body).paging
        const res = JSON.parse(body).data
        for (var k in res) {
          if (res[k]['name'].search(regex) > -1) {
            arr.push(res[k])
          }
        }
        if (!paging.next) {
          return done(null, arr)
        }
        giveMeData(paging.next)
      } else {
        done(error)
      }
    })
  }
  giveMeData(access)
}
