const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../app/models/user')
const configAuth = require('./auth')

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['displayName', 'emails']
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err) { return done(err) }
        if (user) {
          user.facebook.token = accessToken
          return done(null, user)
        } else {
          const newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.token = accessToken
          newUser.facebook.name = profile.displayName
          newUser.facebook.email = profile.emails[0].value
          newUser.facebook.lastUpdated = Date.now()
          newUser.save((err) => {
            if (err) { throw err }
            return done(null, newUser)
          })
        }
      })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })
}
