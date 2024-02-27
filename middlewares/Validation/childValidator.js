const { body , param }=require("express-validator")

exports.bodyValidate =[
    body("fullName").isString().withMessage("name must be a string")
    .isLength({min:3,max:40}).withMessage("num must be between 3, 40 characters"),
    body("age").isNumeric().withMessage("age must be a number").custom((value)=>{
        if(value < 3){
            throw new Error ("Age must be older than 3");
        }
        return true;
    }),
    body("level").custom((value) => {
        if (value !== "PreKG" && value !== "KG1" && value !== "KG2") {
            throw new Error("Level must be PreKG, KG1 or KG2");
        }
        return true;
    }),
    body("city").isString().withMessage("City must be a string"),
    body("street").isString().withMessage("Street must be a string"),
    body("building").isString().withMessage("Building must be a string")
]

exports.paramValidate = [
    param("id").isNumeric().withMessage("Id must be a number")
]