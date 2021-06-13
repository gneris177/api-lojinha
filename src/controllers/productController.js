const Product = require("../models/produtoModel");

exports.add = (req, res) => {
  try {
    let product = req.body.produto;
    let desc = req.body.descricao;

    Product.create({
      userId: req.userId,
      produto: product,
      descricao: desc,
      img: "url/dhhhd",
    })
      .then((m) => res.json({ message: "sucess" }))
      .catch((e) => res.send(e));
  } catch (e) {
    console.log(e);
  }
};

exports.myProduct = (req, res) => {
  try {
    let id = req.userId;

    Product.find({ userId: id })
      .then((products) => res.json({ products: products }))
      .catch((e) => res.send(e));
  } catch (e) {
    console.log(e);
  }
};

exports.edit = (req, res) => {
  try {
    id = req.body.id;

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
    id = req.body.id;

    Product.findByIdAndDelete(id)
      .then(() => res.json({ message: "sucess " }))
      .catch((e) => res.json({ message: e }));
  } catch (e) {
    console.log(e);
  }
};

//List Public
exports.listProducts = (req, res) => {
  try { 
    Product.find()
      .then((products) => res.json({ products: products }))
      .catch((e) => res.send(e));
  } catch (e) {
    console.log(e);
  }
};