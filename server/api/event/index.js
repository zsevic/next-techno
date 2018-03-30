import express from 'express'
import controller from './event.controller'
const router = express.Router()

router.get('/', controller.index)

module.exports = router
