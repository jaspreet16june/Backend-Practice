const express = require('express');
const reviewRouter = express.Router();
const {protectRoute,bodyChecker,isAuthorized } = require("./utilFun")
const reviewModel = require("../model/reviewModel")
const {createElement,getElement,getElements,updateElement,deleteElement} = require("../helper/factory");

const createReview = createElement(reviewModel);
const getReview= getElement(reviewModel);
const getReviews = getElements(reviewModel);
const updateReview = updateElement(reviewModel);
const deleteReview = deleteElement(reviewModel);

reviewRouter.use(protectRoute);

reviewRouter
    .route("/:id")
    .get(bodyChecker, getReview)
    .patch(bodyChecker, isAuthorized(["admin", "ce"]), updateReview)
    .delete(bodyChecker, isAuthorized(["admin"]), deleteReview)

reviewRouter
    .route("/")
    .get(protectRoute, isAuthorized(["admin", "ce"]), getReviews)
    .post(bodyChecker, isAuthorized(["admin"]), createReview);

module.exports = reviewRouter;