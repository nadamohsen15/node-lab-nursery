// reqire variables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../Models/adminSchem");
const teacher = require("../Models/teacherSchema");
require("dotenv").config();


// Login
exports.Login = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    let user;

    // try to find a teacher with the given email
    teacher.findOne({ email })
        .then((foundTeacher) => {
            if (foundTeacher) {
                user = foundTeacher;
                return bcrypt.compare(password, foundTeacher.password);
            }
            // If not found, try to find an admin with the given email
            return admin.findOne({ email })
                .then((foundAdmin) => {
                    if (!foundAdmin) {
                        let error = new Error("Invalid email or password");
                        error.statusCode = 401;
                        throw error;
                    }
                    user = foundAdmin;
                    // No need to compare password for admin as password comparison is done later
                    return bcrypt.compare(password, foundAdmin.password);;
                });
        })
        .then((isMatch) => {
            // If isMatch is true, the password matches for either teacher or admin
            if (!isMatch) {
                let error = new Error("Invalid email or password");
                error.statusCode = 401;
                throw error;
            }

            // Generate token
            const token = jwt.sign(
                {
                    id: user._id,
                    fullname: user.fullName,
                    role: user instanceof teacher ? "teacher" : "admin",
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            // Send response
            res.status(200).json({
                message: "Login successful",
                token
            });
        })
        .catch((error) => {
            next(error);
        });
};