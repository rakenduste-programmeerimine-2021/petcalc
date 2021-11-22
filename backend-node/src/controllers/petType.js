const PetType = require('../models/PetType')

exports.getPetTypes = async (req, res) => {

  const petTypes = await PetType.find({})

  res.status(200).send(petTypes)
}

exports.getPetType = async (req, res) => {

  const { id } = req.params
  const petType = await PetType.findById(id)

  res.status(200).send(petType)
}

exports.createPetType = async (req, res) => {

  const newPetType = req.body
  const createdPetType = new PetType(newPetType)
  const savedPetType = await createdPetType.save()

  res.status(200).send(`Created petType ${savedPetType._id}`)
}

exports.updatePetType = async (req, res) => {

  const { id } = req.params
  const createdPetType = await PetType.findById(id)
  createdPetType = req.body;
  const savedPetType = await createdPetType.save()

  res.status(200).send(`Updated petType ${savedPetType._id}`)
}

exports.deletePetType = async (req, res) => {

  const { id } = req.params
  const petType = await PetType.findOneAndDelete({ _id: id })

  if (!petType) res.status(404).send("No petType with that id found")
  res.status(200).send(`Successfully deleted the following petType: \n ${petType}`)
}