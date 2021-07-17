const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceDiscount: {
    type: Number,
  },
  off: {
    type: Number,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
});

const productModel = mongoose.model("product", ProductSchema);
module.exports = productModel;
