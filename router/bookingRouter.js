const express = require("express");
const bookingModel = require("../model/bookingModel");
const Razorpay = require("razorpay");
const { bodyChecker, protectRoute, isAuthorised } = require("./utilFunc");
let { KEY_ID, KEY_SECRET } = require("../hide/secret");
var razorpay = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
});



const { 
    getElement, getElements,
    updateElement} = require("../helper/factory");
const userModel = require("../model/userModal");

    const bookingRouter = express.Router();
    
    let getBookings = getElements(bookingModel);
    let getBooking = getElement(bookingModel);
    let updateBooking = updateElement(bookingModel);
    
    
    bookingRouter.use(protectRoute);
    
    // const initiateBooking = async function (req,res){
    //   try{
    
    //       let booking = await bookingModel.create(req.body);
    //       let bookingId = booking["_id"];
    //       let userId = booking.user;
    //       let user = await userModel.findById(userId);
    //       user.bookings.push(bookingId);

    
    //       await user.save();
    
    //       const payment_capture = 1;
    //     const amount = 500;
    //     const currency = "INR";
    //     const options = {
    //         amount,
    //         currency,
    //         receipt: `rs_${bookingId}`,
    //         payment_capture,
    //     };
    //     const response = await razorpay.orders.create(options);
    //     console.log(response);
    //     res.status(200).json({
    //         id: response.id,
    //         currency: response.currency,
    //         amount: response.amount,
    //         booking: booking,
    //         message: "booking created",
    //     });


    //       res.status(200).json({
    //           message:"booking created",
    //           booking: booking
    //       })
    
    // }catch(err){
    //      res.status(404).json({
    //          message:err.message
    //      })
    //    }
        
    // }
    
    const initiateBooking = async function (req, res) {
        try {
            let booking = await bookingModel.create(req.body);
            let bookingId = booking["_id"];
            let userId = req.body.user;
            let user = await userModel.findById(userId);
            user.bookings.push(bookingId);
            await user.save();
            const payment_capture = 1;
            const amount = 500;
            const currency = "INR";
            const options = {
                amount,
                currency,
                receipt: `rs_${bookingId}`,
                payment_capture,
            };
            const response = await razorpay.orders.create(options);
            console.log(response);
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
                booking: booking,
                message: "booking created",
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
    const deleteBooking = async function(req,res){
      try{
    
      
        let booking = await bookingModel.findAndDelete(req.body.id);
        let planId = booking.plan;
        let plan = await bookingModel.findById(planId);
        let idxOfBooking = plan.bookings.indexOf(booking["_id"]);
     
        plan.booking.splice(idxOfBooking, 1);
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
        
   
    bookingRouter
    .route('/')
    .post(bodyChecker, isAuthorised(["admin"]), initiateBooking)
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


module.exports = bookingRouter;