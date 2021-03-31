//require module part
var {allUserController , userDetailsController} = require("../controller/userController")
var getExpress = require("express");


var route = getExpress.Router()


route.get("/allUser" , allUserController) //all user route
route.get("/:userName/details" , userDetailsController) //individual user details route

//export part
module.exports = route;