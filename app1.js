const express = require('express');
const path = require("path");

const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("./secret");
const app = express();
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const planRouter = require("./router/planRouter");



app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plan", planRouter);


app.listen("8008",function(){
    console.log("Server 8008 is listening");
})


app.use(function(req,res){
    let rest_of_the_path = path.join("/public","404.html")
    res.status(400).sendFile(path.join(__dirname,rest_of_the_path));
})