const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  nome:  String,
  email: String,
  senha:   String,
  endereco: String,
  loja: String,
  linkOnline: String
});

const registerModel = mongoose.model('users', UserSchema);
module.exports = registerModel;