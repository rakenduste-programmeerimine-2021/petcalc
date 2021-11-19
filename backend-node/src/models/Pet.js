const { Schema, model } = require('mongoose')

const petSchema = new Schema({
  name: { type: String, default: 'nimi' },
  dateOfBirth: { type: String, default: Date.now() },
  type: { type: String, default: 'pet' }, 
});

const Pet = model('Pet', petSchema)

module.exports = Pet