const mongoose = require("mongoose");
const { Schema } = mongoose;

const advertisingSchema = new Schema ({
  userId: String,
  desc:  String,
  aproved: Boolean,
  img: String
})

const advertisingModel = mongoose.model('advertising', advertisingSchema);
module.exports = advertisingModel;