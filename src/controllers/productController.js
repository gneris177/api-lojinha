const User = require("../models/userModel");
const Product = require("../models/produtoModel");
const cloudinary = require("../config/cloudinaryConfig");

exports.add = async (req, res) => {
  try {
    const { product, desc, value } = req.body;
    let imgUrl;

    if (req.file) {
      try {
        response = await cloudinary.uploader.upload(req.file.path);
        imgUrl = response.url;
      } catch (err) {
        console.log(err);
      }
    }

    Product.create({
      userId: req.userId,
      produto: product,
      value: value,
      desc: desc,
      imgUrl: imgUrl,
    })
      .then((m) => res.json({ message: "sucess" }))
      .catch((e) => res.json({ message: "erro" }));
  } catch (e) {
    console.log(e);
  }
};

exports.myProduct = (req, res) => {
  try {
    const id = req.userId;
    Product.find({ userId: id })
      .then((products) => res.json({ message: products }))
      .catch((e) => res.json({ message: e }));
  } catch (e) {
    console.log(e);
  }
};

exports.edit = (req, res) => {
  try {
    const id = req.body.id;
    Product.findByIdAndUpdate(id, {
      produto: "novo",
      descricao: "bom",
      img: "url/dhhhd",
    })
      .then(() => res.json({ message: "sucess" }))
      .catch((e) => res.json({ message: e }));
  } catch (e) {
    console.log(e);
  }
};

exports.delete = (req, res) => {
  try {
    const id = req.body.id;
    Product.findByIdAndDelete(id)
      .then(() => res.json({ message: "sucess" }))
      .catch((e) => res.json({ message: e }));
  } catch (e) {
    console.log(e);
  }
};

//List Public
exports.listProducts = (req, res) => {
  try {
    Product.find()
      .then((products) => res.json({ message: products }))
      .catch((e) => res.send(e));
  } catch (e) {
    console.log(e);
  }
};
