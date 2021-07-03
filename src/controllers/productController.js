const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");
const CronJob = require("cron").CronJob;
const fs = require("fs");

exports.add = async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    const product = await Product.create({
      userId: req.userId,
      name: name,
      desc: desc,
      price: price,
    }).catch((err) => res.status(400).json({ erro: err }));

    //upload img
    if (req.file) {
      try {
        response = await cloudinary.uploader.upload(req.file.path);
        imgUrl = response.url;
      } catch (err) {
        res.status(400).json({ message: err });
      }
    }

    //delete upload
    const resultHandler = (err) => {
      if (err) console.log("unlink failed", err);
    };
    fs.unlink(req.file.path, resultHandler);

    //add url img
    Product.findByIdAndUpdate(
      product.id,
      { imgUrl: imgUrl },
      { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
    ).catch((e) => res.status(400).json({ message: e }));

    //auto delete later 24h
    const job = new CronJob(
      "0 0 */3 * * *",
      async () => {
        await Product.findByIdAndDelete(product.id)
          .then(() => jobStop())
          .catch((e) => console.log(e));
      },
      null,
      true,
      "America/Los_Angeles"
    );
    const jobStop = () => job.stop();

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
