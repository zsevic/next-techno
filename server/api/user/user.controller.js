import User from './user.model'

async function index (req, res, next) {
  try {
    let users = await User.find({})
    res.json(users)
  } catch (e) {
    res.status(500).end()
  }
}

async function show (req, res, next) {
  try {
    let id = req.params.id
    let user = await User.findOne({ id })
    res.json(user)
  } catch (e) {
    res.status(500).end()
  }
}

/* async function create (req, res, next) {
  try {
    let user = req.body
    let newUser = new User({
      id: user.id,
      name: user.name
    })
    await newUser.save()
    res.status(200).send('OK')
  } catch (e) {
    res.status(500).end()
  }
} */

async function update (req, res, next) {
  try {
    let id = req.params.id
    let user = req.body
    await User.findOneAndUpdate({ id }, user)
    res.status(200).end()
  } catch (e) {
    res.status(500).end()
  }
}

async function destroy (req, res, next) {
  try {
    let id = req.params.id
    await User.findOneAndRemove({ id })
    res.status(200).end()
  } catch (e) {
    res.status(500).end()
  }
}

export default {
  index,
  show,
  //  create,
  update,
  destroy
}
