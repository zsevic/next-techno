import path from 'path'
const DIST_DIR = path.join(__dirname, '../dist')

export default function (app, passport) {
  app.use('/auth', require('./auth'))
  app.use('/api/users', require('./api/user'))
  app.use('/api/events', isLoggedIn, require('./api/event'))
  // app.use("/api/pages", require("./api/pages"));

  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
