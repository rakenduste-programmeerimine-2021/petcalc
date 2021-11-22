const { Schema, model } = require('mongoose')

const petTypeSchema = new Schema({
  species: { type: String, default: 'liik' },
  youngUntilXMonths: { type: Number, default: 6 },
  minInMorning: { type: Number, default: 30 }, 
  minInEvening: { type: Number, default: 30 }, 
  minInDay: { type: Number, default: 30 }, 
  hInWeek: { type: Number, default: 10 }, 
  dInMonth: { type: Number, default: 5 }, 
  moneyInMonth: { type: Number, default: 100 }, 
});

const PetType = model('PetType', petTypeSchema)

module.exports = PetType