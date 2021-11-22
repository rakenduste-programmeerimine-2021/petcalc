const Pet = require('../models/Pet')

exports.getPets = async (req, res) => {

  const pets = await Pet.find({})

  res.status(200).send(pets)
}

exports.getPet = async (req, res) => {

  const { id } = req.params
  const pet = await Pet.findById(id)

  res.status(200).send(pet)
}

exports.createPet = async (req, res) => {

  const newPet = req.body
  const createdPet = new Pet(newPet)
  const savedPet = await createdPet.save()

  res.status(200).send(`Created pet ${savedPet._id}`)
}

exports.updatePet = async (req, res) => {

  const { id } = req.params
  const createdPet = await Pet.findById(id)
  createdPet = req.body;
  const savedPet = await createdPet.save()

  res.status(200).send(`Updated pet ${savedPet._id}`)
}

exports.deletePet = async (req, res) => {

  const { id } = req.params
  const pet = await Pet.findOneAndDelete({ _id: id })

  if (!pet) res.status(404).send("No pet with that id found")
  res.status(200).send(`Successfully deleted the following pet: \n ${pet}`)
}