const router = require("express").Router()
const petTypeController = require("../controllers/petType")
const jwtAuth = require('../middleware/jwtAuth')

router.get("/", petTypeController.getPetTypes)
router.get("/:species", petTypeController.getPetType)
router.post("/create", jwtAuth, petTypeController.createPetType)
router.put("/update/:id", jwtAuth, petTypeController.updatePetType)
router.delete("/delete/:id", jwtAuth, petTypeController.deletePetType)

module.exports = router