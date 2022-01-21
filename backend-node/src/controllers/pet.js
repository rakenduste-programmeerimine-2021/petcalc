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

  res.status(200).send({message:`Created pet ${savedPet._id}`})
}

exports.updatePet = async (req, res) => {

  const { id } = req.params
  const { name, dateOfBirth, type, user } = req.body
  try {
    const pet = await Pet.findByIdAndDelete(id)
      if (!pet) throw Error("Pet with that id doesnt exist")
  
      const newPet = new Pet({
        _id:id,
        name,
        dateOfBirth,
        type,
        user
      })
  
      const savedPet = await newPet.save()
      if (!savedPet) throw Error("Error saving pet")
  
      res.status(200).json({ message: "Pet updated successfully" })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
  
}

exports.deletePet = async (req, res) => {

  const { id } = req.params
  const pet = await Pet.findOneAndDelete({ _id: id })

  if (!pet) res.status(404).send("No pet with that id found")
  res.status(200).send({message:`Successfully deleted the following pet: \n ${pet}`, deletedPetID:pet._id})
}

exports.getAllPetsForUser = async (req, res) => {

  const { userid } = req.params
  const pets = await Pet.find({ user: userid })

  if (!pets) res.status(404).send(`No pets with that user found(${userid})`)
  res.status(200).json({body:pets})
}