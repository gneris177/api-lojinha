const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");
const CronJob = require("cron").CronJob;
const fs = require("fs");

exports.add = async (req, res) => {
  try {
    const { name, desc, price } = req.body;
    console.log(req.body);
    let imgUrl, idProduct;

    Product.create({
      userId: req.userId,
      name: name,
      desc: desc,
      price: price,
    })
      .then((response) => (idProduct = response.id))
      .catch((err) => res.status(400).json({ erro: err }));

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
      idProduct,
      { imgUrl: imgUrl },
      { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
    ).catch((e) => res.status(400).json({ message: e }));

    //auto delete later 24h
    const job = new CronJob(
      "0 0 */3 * * *",
      async () => {
        await Product.findByIdAndDelete(idProduct)
          .then(() => jobStop())
          .catch((e) => console.log(e));
      },
      null,
      true,
      "America/Los_Angeles"
    );
    const jobStop = () => job.stop();

    res.status(200).json({ message: "sucess" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.products = (req, res) => {
  try {
    Product.find()
      .then((products) => res.json({ message: products }))
      .catch((e) => res.send(e));
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
    const { id, name, desc, price } = req.body;
    Product.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        desc: desc,
        price: price,
      },
      { new: true, useFindAndModify: false }
    )
      .then(() => res.status(200).json({ message: "sucess" }))
      .catch((err) => res.json({ message: err }));
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
