const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  userId: String,
  name: String,
  price: String,
  desc: String,
  imgUrl: String,
});

const productModel = mongoose.model("product", ProductSchema);
module.exports = productModel;
