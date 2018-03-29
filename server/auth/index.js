import express from 'express'
import './local/passport'
import './facebook/passport'
const router = express.Router()

router.use('/local', require('./local'))
router.use('/facebook', require('./facebook'))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
