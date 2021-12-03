const router = require("express").Router()
const userController = require("../controllers/user")


router.get("/:id", userController.getUserInfo)
router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)

module.exports = router