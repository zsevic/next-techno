import User from '../user/user.model'
import Event from './event.model'
import Page from '../page/page.model'
import nextTechno from './../../nextTechno'

async function index (req, res, next) {
  try {
    const token = req.user.facebook.token
    const user = req.user
    let lastUpdate = Date.now() - new Date(user.facebook.lastUpdated)

    if (lastUpdate > 3600000) {
      try {
        await User.update(
          { 'facebook.id': user.facebook.id },
          {
            $set: {
              'facebook.lastUpdated': new Date()
            }
          }
        )

        await Event.remove({})
        let pages = await Page.find({})

        nextTechno(pages, token, (err, result) => {
          if (err) {
            throw err
          }

          result.sort((a, b) => {
            return new Date(a.start_time) - new Date(b.start_time)
          })

          res.json(result)
        })
      } catch (e) {
        res.status(500).end()
      }
    } else {
      try {
        let events = await Event.find({})

        const result = events.sort((a, b) => {
          return new Date(a.start_time) - new Date(b.start_time)
        })

        res.json(result)
      } catch (e) {
        res.status(500).end()
      }
    }
  } catch (e) {
    res.status(500).end()
  }
}

export default {
  index
}
