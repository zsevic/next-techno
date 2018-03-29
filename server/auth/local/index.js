import express from 'express'
import passport from 'passport'
const router = express.Router()

// authentication
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/about',
  failureRedirect: '/contact'
}))

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/about',
  failureRedirect: '/contact'
}))

// authorization
router.post('/connect', passport.authenticate('local-signup', {
  successRedirect: '/about',
  failureRedirect: '/contact'
}))

router.get('/unlink', (req, res) => {
  let user = req.user
  user.local.email = undefined
  user.local.password = undefined
  user.save(() => {
    res.redirect('/test')
  })
})

module.exports = router
