const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")


exports.signup = async (req, res) => {

  
    
    const { email, password, againPassword, securityQuestion, securityAnswer } = req.body
  
    
  
    try {
      const user = await User.findOne({ email })
  
      if (user) throw Error("User with that e-mail already exists")

      if (againPassword!=password) throw Error("Something critical happened 172387123")
  
      const salt = await bcrypt.genSalt(10)
      if (!salt) throw Error("Something critical happened 483543875")
  
      const hash = await bcrypt.hash(password, salt)
      if (!hash) throw Error("Something critical happened 123172387")

      const newUser = new User({
        email,
        password: hash,
        securityQuestion,
        securityAnswer,
      })
  
      const savedUser = await newUser.save()
      if (!savedUser) throw Error("Error saving user")
  
      res.status(200).json({ message: "User created successfully", createdUserID:savedUser._id })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  exports.login = async (req, res) => {
    
    const { email, password } = req.body
  
    try {
      const user = await User.findOne({ email })
  
      if (!user) throw Error("User with this e-mail does not exist")
  
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw Error("Error")
  
      const userTemplate = {
        id: user._id,
        email,
      }
  
      const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
      if (!token) throw Error("Something critical happened 99981811")
  
      res.status(200).json({
        token,
        user: {...userTemplate},
      })
  
    } catch (e){
      res.status(400).json({ error: e.message })
    }
  }

  exports.updateUser = async (req, res) => {
    
    const { email, password, againPassword, securityQuestion, securityAnswer, options } = req.body
    const { id } = req.params
  
    try {
      const user = await User.findById(id)
  
      if (!user) throw Error("User with that id doesnt exist")
  
      if (againPassword!=password) throw Error("Something critical happened 172387123")

      const salt = await bcrypt.genSalt(10)
      if (!salt) throw Error("Something critical happened 483543875")
  
      const hash = await bcrypt.hash(password, salt)
      if (!hash) throw Error("Something critical happened 123172387")
  
      
      const newUser = new User({
        email,
        password: hash,
        securityQuestion,
        securityAnswer,
        options,
      })
  
      const savedUser = await newUser.save()
      if (!savedUser) throw Error("Error saving user")
  
      res.status(200).json({ message: "User updated successfully" })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  exports.deleteUser = async (req, res) => {
    
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
  
    if (!user) res.status(404).json({error:"No user with that id found"})
    res.status(200).json({message:`Successfully deleted the following user: \n ${user.email}`, deletedUserID:user._id})
  }

  exports.getUserInfo = async (req, res) => {
    
    const { id } = req.params
    const user = await User.findById( id )
  
    if (!user) res.status(404).json({error:"No user with that id found"})
    res.status(200).json(user)
  }