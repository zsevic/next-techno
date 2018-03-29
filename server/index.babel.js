'use strict'

import express from 'express'
import passport from 'passport'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes'
import 'regenerator-runtime/runtime'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
dotenv.config()
const app = express()
const MongoStore = connectMongo(session)

const DIST_DIR = path.join(__dirname, '../dist')
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      url: process.env.MONGODB_URI
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(DIST_DIR))

mongoose.connect(
  process.env.MONGODB_URI,
  { useMongoClient: true },
  (err, db) => {
    if (!err) console.log('Database connection is established')
    routes(app, passport)
  }
)
mongoose.Promise = global.Promise

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
