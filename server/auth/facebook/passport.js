import passport from 'passport'
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../api/user/user.model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ['displayName', 'emails'],
  callbackURL: `${process.env.DOMAIN}/auth/facebook/callback`,
  passReqToCallback: true
}, (req, token, refreshToken, profile, done) => {
  process.nextTick(() => {
    if (!req.user) {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err) { return done(err) }

        if (user) {
          if (!user.facebook.token) {
            user.facebook.token = token
            user.facebook.name = profile.displayName
            user.facebook.email = profile.emails[0].value
            user.save(() => {
              if (err) { throw err }
              return done(null, user)
            })
          }
          return done(null, user)
        } else {
          let newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.token = token
          newUser.facebook.name = profile.displayName
          newUser.facebook.email = profile.emails[0].value

          newUser.save((err) => {
            if (err) throw err
            return done(null, newUser)
          })
        }
      })
    } else {
      let user = req.user
      user.facebook.id = profile.id
      user.facebook.token = token
      user.facebook.name = profile.displayName
      user.facebook.email = profile.emails[0].value

      user.save(err => {
        if (err) throw err
        return done(null, user)
      })
    }
  })
}))
