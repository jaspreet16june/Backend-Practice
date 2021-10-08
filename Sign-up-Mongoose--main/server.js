const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.listen('5000',function(){
    console.log('App is listening to the port 2000')
})

app.use(express.json());
app.use(express.static('public'));

const userRouter = require('./model/routers/userRouter')
const authRouter = require('./model/routers/authRouter')

app.use('/user',userRouter);
app.use('/auth',authRouter);


