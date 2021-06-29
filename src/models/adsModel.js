const mongoose = require("mongoose");
const { Schema } = mongoose;

const advertisingSchema = new Schema({
  userId: String,
  payLink: String,

  desc: String,
  aproved: Boolean,
  img: String,
  linkToAds: String,
});

const advertisingModel = mongoose.model("advertising", advertisingSchema);
module.exports = advertisingModel;
