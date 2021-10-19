const express = require("express");
const planModel = require("../model/planModel");
const { bodyChecker, protectRoute, isAuthorised } = require("./utilFunc");

const { createElement,
    getElement, getElements,
    updateElement,
    deleteElement } = require("../helper/factory");

const planRouter = express.Router();

const createPlan = createElement(planModel);
let getPlans = getElements(planModel);
let getPlan = getElement(planModel);
let updatePlan = updateElement(planModel);
let deletePlan = deleteElement(planModel);

planRouter.use(protectRoute);

// planRouter
//     .route("/:id")
//     .get(bodyChecker, getPlan)
//     .patch(bodyChecker, isAuthorised(["admin", "ce"]), updatePlan)
//     .delete(bodyChecker, isAuthorised(["admin"]), deletePlan)

// planRouter
//     .route("/")
//     .get(protectRoute, isAuthorised(["admin", "ce"]), getPlans)
//     .post(bodyChecker, isAuthorised(["admin"]), createPlan);

planRouter
    .route('/')
    .post(bodyChecker, isAuthorised(["admin"]), createPlan)
    // localhost/plan -> get
    .get(protectRoute, isAuthorised(["admin", "ce"]), getPlans);
// console.log(2)
// planRouter.route("/sortByRating", getbestPlans);
planRouter.route("/:id")
    .get(getPlan)
    .patch(bodyChecker, isAuthorised(["admin", "ce"]), updatePlan)
    .delete(bodyChecker, isAuthorised(["admin"]), deletePlan)

planRouter.route("/sortByRating")
          .get(getBestPlan)

          async function getBestPlan(req,res){
              try{
                  let plans = await planModel.find().sort("avgRating").populate({
                      path:"reviews",
                      select:"review"
                  })

                  res.status(200).json({
                      plans
                  })
              }
              catch(err){
                res.status(404).json({
                    message:err.message
                })
              }
          }

module.exports = planRouter;