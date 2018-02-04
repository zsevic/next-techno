const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 8080

const configDB = require('./config/database')
mongoose.connect(configDB.url, { useMongoClient: true })
mongoose.Promise = global.Promise
const MongoStore = connectMongo(session)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

require('./config/passport')(passport)

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI
  })
}))

app.use(passport.initialize())
app.use(passport.session())

require('./app/routes')(app, passport)

app.listen(port, () => {
  console.log(`The magic happens on port ${port}`)
})
