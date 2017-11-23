const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const configDB = require('./config/database')
mongoose.connect(configDB.url, {useMongoClient: true})
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 8080)
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

require('./config/passport')(passport)

app.use(cookieSession({
  name: 'session',
  keys: ['spontaneouscat'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())

require('./app/routes')(app, passport)

app.listen(app.get('port'), () => {
  console.log(`The magic happens on port ${app.get('port')}`)
})
