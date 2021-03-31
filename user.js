//require model
var mongoose = require("mongoose");


var Schema = mongoose.Schema

//creat a user model
var registrationLogin = new Schema({
    name:{
        type: String,
        required:[true , "name required"]
    },
    userName:{
        type: String,
        required: [true , "User Name required"]
    },
    password:{
        type: String,
        min: 8,
        required : [true , "Password Required"]
    },
    email:{
        type: String,
        required : [true , "email required"],
        unique :  true,
        trim: true
    },
    dateOfBirth:{
        type: Date,
        default: Date.now,
        required : [true , "date of birth required"]
    },
    sex:{
        type: String
    },
    update:{
        type: Date,
        default:Date.now
    }
})

var userRegistrationLoginModel = mongoose.model("User" , registrationLogin )

//export part
module.exports = userRegistrationLoginModel;