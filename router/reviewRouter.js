const express = require("express");
const reviewModel = require("../model/reviewModel");
const { bodyChecker, protectRoute, isAuthorised } = require("./utilFunc");

const { createElement,
    getElement, getElements,
    updateElement,
    deleteElement } = require("../helper/factory");

    const reviewRouter = express.Router();
    
    const createReview = createElement(reviewModel);
let getReviews = getElements(reviewModel);
let getReview = getElement(reviewModel);
let updateReview = updateElement(reviewModel);
let deleteReview = deleteElement(reviewModel);

reviewRouter.use(protectRoute);

// planRouter
//     .route("/:id")
//     .get(bodyChecker, getPlan)
//     .patch(bodyChecker, isAuthorised(["admin", "ce"]), updatePlan)
//     .delete(bodyChecker, isAuthorised(["admin"]), deletePlan)

// planRouter
//     .route("/")
//     .get(protectRoute, isAuthorised(["admin", "ce"]), getPlans)
//     .post(bodyChecker, isAuthorised(["admin"]), createPlan);

reviewRouter
.route('/')
.post(bodyChecker, isAuthorised(["admin"]), createReview)
// localhost/plan -> get
.get(protectRoute, isAuthorised(["admin", "ce"]), getReviews);
// console.log(2)

reviewRouter
    .route("/getUserAlso")
    .get(getUserAlso)
// planRouter.route("/sortByRating", getbestPlans);
reviewRouter.route("/:id")
.get(getReview)
.patch(bodyChecker, isAuthorised(["admin", "ce"]), updateReview)
.delete(bodyChecker, isAuthorised(["admin"]), deleteReview)
async function getUserAlso(req, res) {

        try {
            let reviews = await reviewModel.find().populate({
                path: "user plan",
                select: "name email duration price name"
            })
    
            res.status(200).json({
                review: reviews,
            })
    
        }
        catch (err) {
            res.status(500)
                .json({
                    err: err.message,
                })
        }
    
    }
    

module.exports = reviewRouter;