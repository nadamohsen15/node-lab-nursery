const Class=require("../Models/classSchema")

exports.getAllClasses=(req,res,next)=>{
    Class.find().then((classes)=>{
        res.status(200).json(classes)
    }).catch((error)=>{
        next(error)
    })
}
exports.getClassById=(req,res,next)=>{
    const id = req.params.id;
    Class.findById({ _id: id })
    .then((classes) => {
    if (!classes) throw new Error("Id does not exist"); 
    res.status(200).json(classes);
    })
    .catch((error) => {
    next(error); 
    });
}
exports.insertClass=(req,res,next)=>{
    const c=new Class (req.body);
    c.save()
        .then((c)=>{
            res.status(201).json({
                message:"Class added successfuly",
                c
            })
        }).catch((error)=>{
            next(error);
        })
}
exports.updateClass=(req,res,next)=>{
    Class.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((classs) => {
        res.status(200).json({
            message: "class updated successfully",
            classs
        });
    })
    .catch((error) => {
        next(error);
    });
}
exports.deleteClass=(req,res,next)=>{
    Class.findByIdAndDelete(req.body._id)
    .then((classs) => {
        res.status(200).json({
            message: "class deleted successfully",
            classs
        });
    })
    .catch((error) => {
        next(error);
    });
}
exports.classSupervisor=(req,res,next)=>{
    const _id = req.params._id;
    Class.findById(req.params["id"])
    .then((c) => {
            if (!c) throw new Error("Id does not exist");
            res.status(200).json(c.supervisor);
        })
        .catch((error) => {
            next(error);
        });
}
exports.classChildren = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("children")
        .then((c) => {
            if (!c) throw new Error("Id does not exist");
            res.status(200).json(c.children);
        })
        .catch((error) => {
            next(error);
        });
};
exports.classSupervisor = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("supervisor")
        .then((c) => {
            if (!c) throw new Error("Id does not exist");
            res.status(200).json(c.supervisor);
        })
        .catch((error) => {
            next(error);
        });
};
