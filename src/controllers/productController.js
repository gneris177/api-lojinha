const autoDelete = require("../services/autoDeleteProduct");
const uploadCloudnary = require("../services/uploadCloudnary");
const Product = require("../models/productModel");

exports.add = async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    const product = await Product.create({
      userId: req.userId,
      name: name,
      desc: desc,
      price: price,
    }).catch((err) => res.status(400).json({ erro: err }));

    //upload img in cloud
    const cloudImg = await uploadCloudnary(req.file);

    //add url img
    Product.findByIdAndUpdate(
      product.id,
      { imgUrl: cloudImg.url },
      { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
    ).catch((e) => res.status(400).json({ message: e }));

    //auto delete later 24h
    autoDelete.start();

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.products = async (req, res) => {
  try {
    const products = await Product.find().catch((err) =>
      res.status(400).json({ error: err })
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.myProduct = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId }).catch((err) =>
      res.json({ error: err })
    );

    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.update = async (req, res) => {
  try {
    const { id, name, desc, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        desc: desc,
        price: price,
      },
      { new: true, useFindAndModify: false }
    ).catch((err) => res.json({ message: err }));

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.delete = (req, res) => {
  try {
    const id = req.body.id;

    Product.findByIdAndDelete(id)
      .then(() => res.status(200).json({ message: "sucess" }))
      .catch((err) => res.status(200).json({ message: err }));
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
