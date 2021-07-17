const uploadCloudnary = require("../services/uploadCloudnary");
const Product = require("../models/productModel");

exports.add = async (req, res) => {
  try {
    const { name, desc, price, off, category, priceDiscount } = req.body;

    const product = await Product.create({
      name: name,
      desc: desc,
      price: price,
      priceDiscount: priceDiscount,
      off: off,
      category: category,
    }).catch((err) => res.status(400).json({ erro: err }));

    //upload img in cloud
    const cloudImg = await uploadCloudnary(req.file);

    //add url img
    Product.findByIdAndUpdate(
      product.id,
      { imgUrl: cloudImg.url },
      { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
    ).catch((e) => res.status(400).json({ message: e }));

    res.status(200).json({ message: "sucess" });
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
