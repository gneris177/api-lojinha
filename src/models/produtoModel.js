const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema ({
  userId: String,
  produto:  String,
  descricao:  String,
  img: String
})

const productModel = mongoose.model('product', ProductSchema);
module.exports = productModel;