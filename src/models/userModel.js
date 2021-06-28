const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  idCustom: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  cnpj: String,
  password: String,
  businessAdress: String,
  businessName: String,
  businessOnline: String,
  businessType: String,
});

const registerModel = mongoose.model("users", UserSchema);
module.exports = registerModel;
