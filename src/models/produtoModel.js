const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  userId: String,
  product: String,
  value: String,
  desc: String,
  imgUrl: String,
});

const productModel = mongoose.model("product", ProductSchema);
module.exports = productModel;
