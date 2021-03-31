//require module part
var {registrationController, loginController} = require("../controller/userController")
var getExpress = require("express");

var route = getExpress.Router()

//create User registration route
route.post("/registration" , registrationController)

//user login route
route.post("/login" , loginController)

//export part
module.exports = route;