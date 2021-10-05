const express = require("express");
const fs = require("fs");

const app = express();


app.use(express.json());
app.listen("8000",function(){
    console.log("Server 8000 is listening");
})
let content = JSON.parse(fs.readFileSync("./data.json"));

const userRouter = express.Router();
// const authRouter = express.Router();

app.use('/user',userRouter);
// app.use('/auth',authRouter);

userRouter
         .route("/")
         .get(getUsers)
         .post(createUser)

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