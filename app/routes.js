const User = require('./models/user')
const Event = require('./models/event')
const Page = require('./models/page')

module.exports = (app, passport) => {
  app.get('/', (req, res, next) => {
    res.render('index.ejs')
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', { user: req.user })
  })

  app.get('/events', isLoggedIn, (req, res) => {
    const token = req.user.facebook.token
    const user = req.user
    let lastUpdate = Date.now() - (new Date(user.facebook.lastUpdated))
    if (lastUpdate > 3600000) {
      User.update({'facebook.id': user.facebook.id}, {$set: {
        'facebook.lastUpdated': new Date()
      }}).then(() => {
        Event.remove({}).then(() => {
          Page.find({}, (err, docs) => {
            if (err) res.status(500).end()
            require('../nextTechno')(docs, token, (err, result) => {
              if (err) { throw err }
              result.sort((a, b) => {
                return (new Date(a.start_time)) - (new Date(b.start_time))
              })
              res.render('events.ejs', {user: req.user, result})
            })
          })
        })
      })
    } else {
      Event.find({}, (err, docs) => {
        if (err) res.status(500).end()
        const result = docs.sort((a, b) => {
          return (new Date(a.start_time)) - (new Date(b.start_time))
        })
        res.render('events.ejs', {user: req.user, result})
      })
    }
  })

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))

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
