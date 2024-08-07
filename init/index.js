const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//link of database line 5-10
const MONGOOOSE_URL = "mongodb://127.0.0.1:27017/wonderlust";
//database connection
async function main() {
  await mongoose.connect(MONGOOOSE_URL);
}
//database connection checking
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
initData.data =  initData.data.map((obj)=>({...obj,owner:"668bb23003c78001de58b816"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();
