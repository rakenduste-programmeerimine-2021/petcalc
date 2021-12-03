const router = require("express").Router()
const petTypeController = require("../controllers/petType")

router.get("/", petTypeController.getPetTypes)
router.get("/:species", petTypeController.getPetType)
router.post("/create", petTypeController.createPetType)
router.put("/update/:id", petTypeController.updatePetType)
router.delete("/delete/:id", petTypeController.deletePetType)

module.exports = router