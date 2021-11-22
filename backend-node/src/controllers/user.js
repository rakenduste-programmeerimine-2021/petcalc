const User = require("../models/User")

exports.signup = async (req, res) => {
    const escapeHTML = str =>
    str.replace(
      /[&<>'"]/g,
      tag =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
    
    const { email, password, againPassword, securityQuestion, securityAnswer } = escapeHTML(req.body)
  
    
  
    try {
      const user = await User.findOne({ email })
  
      if (user) throw Error("User with that e-mail already exists")
  
      
  
      const newUser = new User({
        email,
        password,
        securityQuestion,
        securityAnswer,
      })
  
      const savedUser = await newUser.save()
      if (!savedUser) throw Error("Error saving user")
  
      res.status(200).json({ message: "User created successfully" })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  exports.updateUser = async (req, res) => {
    const escapeHTML = str =>
    str.replace(
      /[&<>'"]/g,
      tag =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
    const { email, password, againPassword, securityQuestion, securityAnswer, options } = escapeHTML(req.body)
  
  
    try {
      const user = await User.findOne({ email })

      if (!user) throw Error("User with this e-mail does not exist")

      const updatedUser = {
        ...user,
        email,
        password,
        securityQuestion,
        securityAnswer,
        options,
      }
  
      const savedUser = await updatedUser.save()
      if (!savedUser) throw Error("Error saving user")
  
      res.status(200).json({ message: "User updated successfully" })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  exports.deleteUser = async (req, res) => {
    const escapeHTML = str =>
    str.replace(
      /[&<>'"]/g,
      tag =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
    const { email } = escapeHTML(req.params)
    const user = await User.findOneAndDelete({ email: email })
  
    if (!user) res.status(404).send("No user with that id found")
    res.status(200).send(`Successfully deleted the following user: \n ${user.email}`)
  }

  exports.getUserInfo = async (req, res) => {
    const escapeHTML = str =>
    str.replace(
      /[&<>'"]/g,
      tag =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
    const { email } = escapeHTML(req.params)
    const user = await User.findOne({ email: email })
  
    if (!user) res.status(404).send("No user with that id found")
    res.status(200).send({user})
  }