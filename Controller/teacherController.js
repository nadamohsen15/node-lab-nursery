const Teacher=require("../Models/teacherSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Class=require("../Models/classSchema")

exports.getAllTeachers=(req,res,next)=>{
    Teacher.find().then((teacher)=>{
        res.status(200).json(teacher)
    }).catch((error)=>{
        next(error)
    })

}

exports.getTeacherById=(req,res,next)=>{
    const id = req.params.id;
    Teacher.findById({ _id: id }) //returns a promise
    .then((teacher) => {
    if (!teacher) throw new Error("Id does not exist"); //this will be caught by catch block
    res.status(200).json(teacher);
    })
    .catch((error) => {
    next(error); //this will be caught by the error middleware
    });
}

exports.insertTeacher = (req, res, next) => {
        
        const imagePath = req.file.path;

        const { fullName, email, password } = req.body;
        bcrypt.hash(password, 10)
            .then((hashedPass) => {
                const teacher = new Teacher({
                    fullName,
                    email,
                    password: hashedPass,
                    image: imagePath,
                });
                return teacher.save();
            })
            .then((newTeacherData) => {
                const token = jwt.sign(
                    {
                        id: newTeacherData._id,
                        fullName: newTeacherData.fullName,
                        role: "teacher",
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "1h" }
                );
                res.status(201).json({ newTeacherData, token, message: "Teacher added successfully" });
            })
            .catch((error) => {
                next(error);
            });
}

exports.updateTeacher = (req, res, next) => {
    const teacherId = req.body._id;
    const imagePath = req.file.path;

    Teacher.findById(teacherId)
        .then((teacher) => {
            if (!teacher) {
                throw new Error("teacher not found");
            }
            // Delete the previous image file
            fs.unlink(teacher.image, (error) => {
                if (error) {
                    console.error("Error deleting previous image:", error);
                }
            });
            // Update the child document with new image path
            teacher.image = imagePath;

            return teacher.save();
        })
        .then((updatedteacher) => {
            res.status(200).json({
                message: "teacher updated successfully",
                teacher: updatedteacher
            });
        })
        .catch((error) => {
            next(error);
        });
}
exports.deleteTeacher = (req, res, next) => {
    const teacherId = req.body._id;
    Teacher.findByIdAndDelete(teacherId)
        .then((teacher) => {
            if (!teacher) {
                throw new Error("Teacher not found");
            }
            // Delete the image file
            fs.unlink(teacher.image, (error) => {
                if (error) {
                    console.error("Error deleting image:", error);
                }
            });
            res.status(200).json({
                message: "Teacher deleted successfully",
                teacher
            });
        })
        .catch((error) => {
            next(error);
        });
}
exports.getSupervisors = (req, res, next) => {
    Class.find({}, { supervisor: 1 })
        .populate("supervisor", "name")
        .then((teachers) => {
            res.status(200).json(teachers);
        })
        .catch((error) => {
            next(error);
        });
};


// Change teacher password
exports.changePassword = (req, res, next) => {
    const { _id, oldPassword, newPassword } = req.body;
    Teacher.findById(_id)
        .then((teacher) => {
            if (!teacher) {
                return res.status(404).send({ message: "Teacher not found" });
            }
            bcrypt.compare(oldPassword, teacher.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send({ message: "Incorrect password" });
                    }
                    const hashedPass = bcrypt.hashSync(newPassword, 10)
                        
                    Teacher.findByIdAndUpdate(_id, { password: hashedPass })
                        .then(() => {
                            res.send({ message: "Password changed successfully" });
                        })
                        .catch((error) => {
                            res.status(500).send({ message: "Internal server error1" });
                        });     
                })
                .catch((error) => {
                    res.status(500).send({ message: "Internal server error3" });
                });
        })
        .catch((error) => {
            res.status(500).send({ message: "Internal server error4" });
        });
};