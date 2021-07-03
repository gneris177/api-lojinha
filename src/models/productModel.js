const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: String,
  imgUrl: String,
});

const productModel = mongoose.model("product", ProductSchema);
module.exports = productModel;
