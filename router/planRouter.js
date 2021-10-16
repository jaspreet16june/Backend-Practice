const express = require('express');
const {protectRoute,bodyChecker,isAuthorized } = require("./utilFun")
const planRouter = express.Router();
const planModel = require("../model/planModel")

 //onlu authorized to admin
 const { createElement,
    getElement, getElements,
    updateElement,
    deleteElement } = require("../helper/factory");

// const planRouter = express.Router();

const createPlan = createElement(planModel);
let getPlan = getElement(planModel);
let getPlans = getElements(planModel);
let updatePlan = updateElement(planModel);
let deletePlan = deleteElement(planModel);

planRouter.use(protectRoute);

planRouter
    .route("/:id")
    .get(bodyChecker, getPlan)
    .patch(bodyChecker, isAuthorized(["admin", "ce"]), updatePlan)
    .delete(bodyChecker, isAuthorized(["admin"]), deletePlan)

planRouter
    .route("/")
    .get(protectRoute, isAuthorized(["admin", "ce"]), getPlans)
    .post(bodyChecker, isAuthorized(["admin"]), createPlan);


module.exports = planRouter;