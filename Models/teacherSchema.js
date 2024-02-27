const mongoose = require('mongoose');
// const {autoInc} = require("auto-increment-group")

const teacherSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: true,
    unique :true
  },
  image:{
    type: String ,
    required : true
  }
},
);


module.exports = mongoose.model('Teacher', teacherSchema);
