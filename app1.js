const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.listen("8000",function(){
    console.log("Server 8000 is listening");
})

let content = JSON.parse(fs.readFileSync("./data.json"));

const userRouter = express.Router();
// const authRouter = express.Router();

app.use('/user',userRouter);
// app.use('/auth',authRouter);

app.use(function(req,res){
    let rest_of_the_path = path.join("/public","404.html")
    res.sendFile(path.join(__dirname,rest_of_the_path));
})

userRouter
.route("/")
         .get(getUsers)
         .post(bodyChecker,createUser)

         // authRouter
         //          .route("/")
         //          .get(authUser)
         
         // userRouter
         //          .route("/:id")
         //          .get(userId)
         
         
    function createUser(req,res){
    let body = req.body;
    console.log(body);

    content.push(body);
    fs.writeFileSync("./data.json",JSON.stringify(content));
   
    res.status(200).json({
        message:body,
    })
}


function getUsers(req,res){    
    res.status(200).json({
        message: content
    })
}

function bodyChecker(req,res,next){
    let body = req.body;
    
    let isPresent = Object.keys(body);
    console.log(isPresent.length);
    if(isPresent.length){
        next();
    }else{
        res.send("send details in body")
    }
}