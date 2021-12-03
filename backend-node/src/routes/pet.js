const router = require("express").Router()
const petController = require("../controllers/pet")

router.get("/", petController.getPets)
router.get("/:id", petController.getPet)
router.post("/create", petController.createPet)
router.put("/update/:id", petController.updatePet)
router.delete("/delete/:id", petController.deletePet)
router.get("/user/:userid", petController.getAllPetsForUser)

module.exports = router