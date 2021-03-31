//npm module require
var getExpress = require("express");
var app = getExpress();
var bodyParser = require("body-parser");
require("dotenv").config();
var mongoose = require("mongoose")
var postRoute = require("./route/postRout")
var getRoute = require("./route/getRoute")

//work with dotenv
var port = process.env.PORT || 8080 ;
var url = process.env.URL;

//body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//creat a server
app.listen(port, ()=> console.log(`Server is running in ${port}`))

//connect the data base with mongoose
mongoose.connect(url ,{useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true})
.then(()=>{
    console.log("Server is connected to the database");
})
.catch((err)=>{
    console.log(err);
})

//root path
app.get("/" , (req, res) => {
    res.send("I am from root")
})

//our all post route
app.use("/user" , postRoute)

//our all get route
app.use("/user" , getRoute )

//our default route
app.get("*" , (req , res) => {
    res.status(404).send("<h1>404 Page not found</h1>")
})