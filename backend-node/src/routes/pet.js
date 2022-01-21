const router = require("express").Router()
const petController = require("../controllers/pet")

const jwtAuth = require("../middleware/jwtAuth")

router.get("/", jwtAuth, petController.getPets)
router.get("/:id", jwtAuth, petController.getPet)
router.post("/create", jwtAuth, petController.createPet)
router.put("/update/:id", jwtAuth, petController.updatePet)
router.delete("/delete/:id", jwtAuth, petController.deletePet)
router.get("/user/:userid", jwtAuth, petController.getAllPetsForUser)

module.exports = router