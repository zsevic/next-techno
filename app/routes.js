const User = require('./models/user')
const Event = require('./models/event')
const Page = require('./models/page')
const nextTechno = require('../nextTechno')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index.ejs')
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', { user: req.user })
  })

  app.get('/events', isLoggedIn, async (req, res) => {
    const token = req.user.facebook.token
    const user = req.user
    let lastUpdate = Date.now() - (new Date(user.facebook.lastUpdated))
    if (lastUpdate > 3600000) {
      try {
        await User.update({ 'facebook.id': user.facebook.id }, {
          $set: {
            'facebook.lastUpdated': new Date()
          }
        })
        await Event.remove({})
        let pages = await Page.find({})
        nextTechno(pages, token, (err, result) => {
          if (err) { throw err }
          result.sort((a, b) => {
            return (new Date(a.start_time)) - (new Date(b.start_time))
          })
          res.render('events.ejs', { user, result })
        })
      } catch (e) {
        res.status(500).end()
      }
    } else {
      try {
        let events = await Event.find({})
        const result = events.sort((a, b) => {
          return (new Date(a.start_time)) - (new Date(b.start_time))
        })
        res.render('events.ejs', { user, result })
      } catch (e) {
        res.status(500).end()
      }
    }
  })

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
