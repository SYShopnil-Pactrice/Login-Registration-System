//require module part
var User = require("../model/user")
var bcrypt = require("bcrypt");

//registration controller
var registrationController = (req , res) => {
    var {name, userName, password, email, dateOfBirth, sex, update} = req.body //get the data from body

    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            res.json({
                message: "password hassing problem",
                err
            })
        }
        var user = new User({
            name,
            userName,
            password: hash,
            email,
            dateOfBirth, //yyyy-mm-dd
            sex,
            update
        })

        //save the user data
        user.save()
        .then(result => {
            res.status(201).json({
                message: "User created Successful",
                data: result
            })
        })
        .catch(err => {
            res.json({
                err
            })
        })
    })
}

//loginController
var loginController = (req , res) => {
    var {email , password} = req.body; //get the data from body

    User.findOne({email})
    .then(user => {
        bcrypt.compare(password, user.password , (err , result) => {
            if(err){
                res.json({
                    message: "Hash password match time problem",
                    err
                })
            }//if there have error in password hashing

            if(result){
                console.log(user);
                res.status(202).json({
                    message: `Wellcome ${(user.name).toUpperCase()}!!!!`,
                    data: user
                })
            }else{
                res.json({
                    message: "Password doesn't match"
                })
            }
        })
    })//if the data found it will exicute

    .catch(err => {
        res.status(404).json({
            message: "User not found",
            err
        })
    })//if expected data not found
}

//all user controller
var allUserController = (req, res) => {
    User.find()
    .then(user => {
        res.status(200).send(user)
    })//if the data found it will exicute
    .catch(err => {
        res.status(404).send(err)
    })
}


//user Details controller
var userDetailsController = (req, res) => {
    var {userName} = req.params //get the data from url
    User.findOne({userName})
    .then(expectedUserName => {
        res.send({
            name: (expectedUserName.name).toUpperCase(),
            sex: expectedUserName.sex.toUpperCase(),
            dateOfBirth: (expectedUserName.dateOfBirth),
            email: expectedUserName.email
        })
    })//if found the data send it

    .catch(err => {
        res.send({
            message: "User not found",
        })
    })
}


//export part
module.exports = {
    registrationController,
    loginController,
    allUserController,
    userDetailsController
}