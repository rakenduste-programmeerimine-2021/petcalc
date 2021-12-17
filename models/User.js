const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  securityQuestion: { type: String, required: true},
  securityAnswer: { type: String, required: true},
  options: { type: String, default: ""},
});

const User = model("User", userSchema)

module.exports = User