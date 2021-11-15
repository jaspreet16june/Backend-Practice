let express = require("express");
let authRouter = express.Router();
let { bodyChecker, protectRoute } = require("./utilFunc");
let jwt = require("jsonwebtoken");
let emailSender = require("../helper/emailSender");

const userModel = require("../model/userModal");
const { JWT_SECRET } = process.env || require("../hide/secret");

authRouter.use(bodyChecker);;

authRouter
    .route("/signup")
    .post(signupUser);

authRouter
    .route("/login")
    .post(loginUser);

authRouter
    .route("/forgetPassword")
    .post(forgetPassword);

authRouter
    .route("/resetPassword")
    .post(resetPassword);

async function signupUser(req, res) {
    try {
        let newUser = await userModel.create(req.body);
        res.status(200).json({
            "message": "user created successfully",
            user: newUser,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

async function loginUser(req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            if (user.password == password) {
                let token = jwt.sign({ id: user["_id"] }, JWT_SECRET);
                res.cookie("JWT", token);
                res.status(200).json({
                    message: "user logged in",
                    user: user,
                })

            } else {
                res.status(404).json({
                    message: "email or password is not correct",
                })
            }
        } else {
            res.status(404).json({
                message: "user not found",
            })
        }
    } catch (err) {
        console.log(error)
        res.status(404)
            .json({
                message: err.message,
            })
    }
}

async function forgetPassword(req, res) {
    try {
        let { email } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            let token = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

            await userModel.updateOne({ email }, { token });
            let newUser = await userModel.findOne({ email });

            await emailSender(token, user.email);

            res.status(200).json({
                message: "user token send to your email",
                user: newUser,
                token
            })
        }
        else {
            res.status(404).json({
                message: "user not found",
            })
        }
    } catch (err) {
        res.status(500)
            .json({
                message: err.message,
            })
    }
}

async function resetPassword(req, res) {
    try {
        let { password, confirmPassword, token } = req.body;
        let user = await userModel.findOne({ token });

        if (user) {
            user.confirmPassword = confirmPassword;
            user.password = password;
            user.token = undefined;

            await user.save();

            let newUser = await userModel.findOne({ email: user.email });

            res.status(200).json({
                message: "password has been changed",
                user: newUser,
                token
            })
        } else {
            res.status(404).json({
                message: "token is incorrect",
            })
        }
    }
    catch (err) {
        res.status(500)
            .json({
                message: err.message,
            })
    }

}

module.exports = authRouter;