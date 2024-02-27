const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
//schema creation

// Define the Address sub-schema
const addressSchema = new mongoose.Schema({
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
  } ,{_id:false}
  );

// Define the Child schema with the updated structure
const ChildSchema = new mongoose.Schema(
    {
        _id:{
            type : Number,
            unique:true
        },
      fullName: {
        type: String,
        required: true,
      }, age: {
        type: Number,
        required: true,
      },
      level: {
        type: String,
        required: true,
        enum: ["PreKG", "KG1", "KG2"], // Level must be one of these values
      },
      address: addressSchema, // Include Address as a sub-document
      
  image:{
    type: String ,
    required : true
  }
    },{_id:false}
  );
  
    
    

//create model


ChildSchema.plugin(AutoIncrement, { id: "child_Id", inc_field: "_id" });

module.exports = new mongoose.model("Child", ChildSchema);

