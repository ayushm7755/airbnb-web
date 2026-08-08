const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const usersController = require("../controllers/users.js");

// Signup
router
    .route("/signup")
    .get(usersController.signup)
    .post(usersController.signupPost);


// Loggin
router
    .route("/login")
    .get(usersController.login)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login",failureFlash : true,}),usersController.loginPost);


// loggout
router.get("/logout",usersController.logout);

module.exports = router; 