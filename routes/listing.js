const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const listings = require("../controllers/listings.js");
const ExpressError = require("../utils/ExpressError.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});
router
  .route("/")
  .get(wrapAsync(listings.index))
  .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listings.createNewListing));
//new page route
router.get("/new", isLoggedIn, listings.addNewListing);
router
  .route("/:id")
  .get(wrapAsync(listings.showListing)) //all listings route
  .put(isLoggedIn, upload.single("listing[image]") ,wrapAsync(listings.updateListing)) //listing update
  .delete(isLoggedIn, wrapAsync(listings.deleteListing)); //listing delete
//edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listings.editListing));

module.exports = router;
