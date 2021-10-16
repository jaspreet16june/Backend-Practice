const express = require('express');
const {protectRoute,bodyChecker,isAuthorized} = require("./utilFun")
const userRouter = express.Router();
const userModel = require("../model/userModel")
// const factory = require("../helper/factory")
const { getElement,createElement,getElements,updateElement,deleteElement} = require("../helper/factory")

const getUser = getElement(userModel)
const createUser = createElement(userModel)
const getUsers = getElements(userModel)
const updateUser = updateElement(userModel)
const deleteUser = deleteElement(userModel);

userRouter
         .route("/")
         .get(getUsers,isAuthorized(["admin"]))
         .post(bodyChecker,isAuthorized(["admin","CE"]),createUser)
        
        
userRouter 
         .route("/:id")
         .get(bodyChecker,getUser)
         .patch(bodyChecker,isAuthorized(["admin","CE"]),updateUser)
         .delete(bodyChecker,isAuthorized(["admin"]),deleteUser)

 //onlu authorized to admin

module.exports = userRouter;