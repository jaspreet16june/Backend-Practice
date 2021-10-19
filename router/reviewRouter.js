const express = require("express");
const reviewModel = require("../model/reviewModel");
const { bodyChecker, protectRoute, isAuthorised } = require("./utilFunc");

const { 
    getElement, getElements,
    updateElement} = require("../helper/factory");

    const reviewRouter = express.Router();
    
    let getReviews = getElements(reviewModel);
    let getReview = getElement(reviewModel);
    let updateReview = updateElement(reviewModel);


reviewRouter.use(protectRoute);

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

const createReview = async function (req,res){
    try{

        let review = await reviewModel.create(req.body);
        let planId = review.plan
    let plan = await reviewModel.findById(planId);
    
    plan.reviews.push(review["_id"]);
    
    if(plan.avgRating){
        let sum = plan.avgRating * plan.reviews.length;
        let finalRating = (sum + review.rating) / (plan.review.length+1);
        
        plan.avgRating = finalRating
        
    }else{
        plan.avgRating  = review.rating;
    }
    }
    catch(err){
        res.status(500).json({
            message:"Server Error"
        })
    }
}

let deleteReview = async function(req,res){
    try{
        let review = await reviewModel.findAndDelete(req.body.id);
        let planId = review.plan;
        let plan = await reviewModel.findById(planId);
        let idxOfReview = plan.reviews.indexOf(review["_id"]);
        plan.review.splice(idxOfReview, 1);
        await plan.save();
        res.status(200).json({
            message: "review deleted",
            review: review
        })
    }  
    catch(err){
        res.status(404).json({
            message:"Server error"
        })
    }
}

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
                err: err.message
            })
        }
    
}
    

module.exports = reviewRouter;