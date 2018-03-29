import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy
const User = require('../../api/user/user.model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({ 'local.email': email }, (err, user) => {
    if (err) { return done(err) }

    if (!user) { return done(null, false) }

    if (!user.validPassword(password)) { return done(null, false) }

    return done(null, user)
  })
}))

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  if (!req.user) {
    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) { return done(err) }

      if (user) {
        return done(null, user)
      } else {
        let newUser = new User()

        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)

        newUser.save(err => {
          if (err) { throw err }
          return done(null, newUser)
        })
      }
    })
  } else {
    let user = req.user

    user.local.email = email
    user.local.password = user.generateHash(password)

    user.save(err => {
      if (err) { throw err }
      return done(null, user)
    })
  }
}))
