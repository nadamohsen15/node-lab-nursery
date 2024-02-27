const mongoose = require('mongoose');
// const {autoInc} = require("auto-increment-group")

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});



//export

module.exports =mongoose.model('Admin', Schema);
