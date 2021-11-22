const router = require("express").Router()
const userController = require("../controllers/user")


router.get("/:email", userController.getUserInfo)
router.post("/signup", userController.signup)
router.put("/update", userController.updateUser)
router.delete("/delete/:email", userController.deleteUser)

module.exports = router