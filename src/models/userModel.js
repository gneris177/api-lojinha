const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  businessAdress: String,
  businessName: String,
  businessOnline: String,
  businessType: String,
});

const registerModel = mongoose.model("users", UserSchema);
module.exports = registerModel;
