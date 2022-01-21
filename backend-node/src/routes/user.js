const router = require("express").Router()
const userController = require("../controllers/user")
const validationMiddleware = require("../middleware/validationMiddleware")
const { check } = require("express-validator")
const jwtAuth = require("../middleware/jwtAuth")

router.get("/:id", jwtAuth, userController.getUserInfo);

router.post("/signup",
[
  check("securityQuestion")
    .isLength({ min: 10 })
    .withMessage("Must be at least 10 characters long")
    .trim()
    .exists()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
    .withMessage("Must be alphabetic"),
  check("securityAnswer")
    .isLength({ min: 3})
    .withMessage("Must be at least 3 characters long")
    .trim()
    .exists()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
    .withMessage("Must be alphabetic"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be correctly formatted e-mail"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long")
    .isStrongPassword()
    .withMessage("Weak password"),
  check("againPassword")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long")
    .isStrongPassword()
    .withMessage("Weak password")
],
validationMiddleware, userController.signup);

router.post("/login",
[
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be correctly formatted e-mail"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long"),
],
validationMiddleware, userController.login);

router.put("/update/:id",
[
    check("securityQuestion")
    .isLength({ min: 10 })
    .withMessage("Must be at least 10 characters long")
    .trim()
    .exists()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
    .withMessage("Must be alphabetic"),
  check("securityAnswer")
    .isLength({ min: 3})
    .withMessage("Must be at least 3 characters long")
    .trim()
    .exists()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
    .withMessage("Must be alphabetic"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be correctly formatted e-mail"),
    check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long")
    .isStrongPassword()
    .withMessage("Weak password"),
  check("againPassword")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long")
    .isStrongPassword()
    .withMessage("Weak password")
],
validationMiddleware, jwtAuth, userController.updateUser);

router.delete("/delete/:id", jwtAuth, userController.deleteUser);

module.exports = router