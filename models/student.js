const mongoose = require("mongoose");

const student = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    type:{type:String}
});


module.exports=Student=mongoose.model("student",student);