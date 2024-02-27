const { body, param } = require("express-validator");


exports.bodyValidate = [
    body("fullName").isString().withMessage("Full Name must be a string")
        .isLength({ min: 3, max: 40 }).withMessage("Full Name must be between 3 to 40 characters"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password").isStrongPassword().withMessage("Password must be a strong password")
]

exports.paramValidate = [
    param("id").isString().withMessage("Id must be a number")
]

exports.changePasswordValidate = [
    body("newPassword").isStrongPassword().withMessage("Password must be a strong password")
]