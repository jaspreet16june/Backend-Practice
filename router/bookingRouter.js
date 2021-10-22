const express = require("express");
const bookingModel = require("../model/bookingModel");
const { bodyChecker, protectRoute, isAuthorised } = require("./utilFunc");

const { 
    getElement, getElements,
    updateElement} = require("../helper/factory");

    const bookingRouter = express.Router();
    
    let getBookings = getElements(bookingModel);
    let getBooking = getElement(bookingModel);
    let updateBooking = updateElement(bookingModel);


    bookingRouter.use(protectRoute);
    
   
    bookingRouter
    .route('/')
    .post(bodyChecker, isAuthorised(["admin"]), createBooking)
// localhost/plan -> get
.get(protectRoute, isAuthorised(["admin", "ce"]), getBookings);
// console.log(2)

bookingRouter
    .route("/getUserAlso")
    .get(getUserAlso)
    // planRouter.route("/sortByRating", getbestPlans);
    bookingRouter.route("/:id")
    .get(getBooking)
.patch(bodyChecker, isAuthorised(["admin", "ce"]), updateBooking)
.delete(bodyChecker, isAuthorised(["admin"]), deleteBooking)



async function getUserAlso(req, res) {

        try {
            let bookings = await bookingModel.find().populate({
                path: "user plan",
                select: "name email duration price name"
            })
            
            res.status(200).json({
                booking: bookings,
            })
            
        }
        catch (err) {
            res.status(500)
            .json({
                err: err.message
            })
        }
    
}
    

module.exports = bookingRouter;