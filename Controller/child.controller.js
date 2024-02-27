const Child= require("../Models/childSchema")
const fs = require('fs');


exports.getAllChilren=(req,res,next)=>{
    
    Child.find().then((children)=>{
        res.status(200).json(children)
    }).catch((error)=>{
        next(error)
    })
    
}

exports.getChildById=(req,res,next)=>{
    const id = req.params.id;
    Child.findById({ _id: id }) //returns a promise
    .then((child) => {
    if (!child) throw new Error("Id does not exist"); //this will be caught by catch block
    res.status(200).json(child);
    })
    .catch((error) => {
    next(error); //this will be caught by the error middleware
    });
}

exports.insertChild = (req, res, next) => {
    const imagePath = req.file.path;
    const { _id, fullName, age, level, city, street, building } = req.body;
    const address = { city, street, building };
    const child = new Child({
        _id,
        fullName,
        age,
        level,
        address,
        image: imagePath,
    });
    child.save()
        .then((newChildData) => {
            res.status(201).json({ newChildData, message: "Child added successfully" });
        })
        .catch((error) => {
            next(error);   
        });
}

exports.updateChild = (req, res, next) => {
    const childId = req.body._id;
    const imagePath = req.file.path;

    Child.findById(childId)
        .then((child) => {
            if (!child) {
                throw new Error("Child not found");
            }
            fs.unlink(child.image, (error) => {
                if (error) {
                    console.error("Error deleting previous image:", error);
                }
            });
            child.image = imagePath;
            return child.save();
        })
        .then((updatedChild) => {
            res.status(200).json({
                message: "Child updated successfully",
                child: updatedChild
            });
        })
        .catch((error) => {
            next(error);
        });
}


exports.deleteChild = (req, res, next) => {
    const childId = req.body._id;

    Child.findById(childId)
        .then((child) => {
            if (!child) {
                throw new Error("Child not found");
            }
            fs.unlink(child.image, (error) => {
                if (error) {
                    console.error("Error deleting image:", error);
                }
            });
            return Child.findByIdAndDelete(childId);
        })
        .then((deletedChild) => {
            res.status(200).json({
                message: "Child deleted successfully",
                child: deletedChild
            });
        })
        .catch((error) => {
            next(error);
        });
}


