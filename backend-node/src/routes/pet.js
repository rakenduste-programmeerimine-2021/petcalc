const router = require("express").Router()
const petController = require("../controllers/pet")

router.get("/", petController.getPets)
router.get("/:id", petController.getPet)
router.post("/create", petController.createPet)
router.put("/update/:id", petController.updatePet)
router.delete("/delete/:id", petController.deletePet)

module.exports = router