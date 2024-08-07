const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// new listing add route
module.exports.addNewListing = (req, res) => {
  res.render("listings/new.ejs");
};

// show listing route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");
  if (!listing) {
    req.flash("error", "Lisitng not found");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Create new Listing route
module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image ={url,filename};
  await newListing.save();
  req.flash("success", "New listing Added"); 
  res.redirect("/listings");
};

// Update Listing
module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "send valid data for listing");
  }
  let { id } = req.params;
let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
if(typeof req.file !=="undefined"){
let url = req.file.path;
let filename = req.file.filename;
listing.image = {url,filename};
await listing.save();
}
req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
};
// Delete Listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
};

// Edit Listings
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Lisitng not found");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs", { listing,originalImageUrl });
};
