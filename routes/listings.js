const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.createListing));

router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});


router
    .route("/:id")
    .get(wrapAsync(listingsController.showRoute))
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingsController.updateRoute))
    .delete(isLoggedIn,isOwner,wrapAsync(listingsController.deleteRoute));
    

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingsController.editRoute));

module.exports = router;