const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//listing schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//listingSchema.post("findOneAndDelete",async(listing)=>{
//if(listing){
// await Review.deleteMany(_id:{$in: listing.reviews})}})

//listing model
const Listing = mongoose.model("Listing", listingSchema);
//export link
module.exports = Listing;
