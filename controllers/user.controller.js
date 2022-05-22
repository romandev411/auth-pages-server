const User = require('../models/User')

module.exports.createUser = async (req, res, next) => {
  const { body: validateBody, error } = req

  if (error) {
    res.send(error)
  } else {
    const user = await new User(validateBody)
    res.send({ user })
  }
}

module.exports.getUser = async (req, res, next) => {
  const user = await User.getUser(req.query)
  if (user) {
    res.send({ user })
  } else {
    res.send({ error: 'Email or password not fount' })
  }
}
