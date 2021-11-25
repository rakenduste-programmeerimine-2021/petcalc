const User = require('../models/User')

exports.getUserInfo = async (req, res) => {

  const { email } = req.params
  const user = await User.findOne(email)

  res.status(200).send(user)
}

exports.signup = async (req, res) => {

  const newUser = req.body
  const createdUser = new User(newUser)
  const savedUser = await createdUser.save()

  res.status(200).send(`Created user ${savedUser.email}`)
}

exports.updateUser = async (req, res) => {

  const { email } = req.params
  const createdUser = await User.findById(email)
  createdUser = req.body;
  const savedUser = await createdUser.save()

  res.status(200).send(`Updated user ${savedUser.email}`)
}

exports.deleteUser = async (req, res) => {

  const { email } = req.params
  const user = await User.findOneAndDelete({ email: email })

  if (!user) res.status(404).send("No user with that id found")
  res.status(200).send(`Successfully deleted the following user: \n ${user}`)
}