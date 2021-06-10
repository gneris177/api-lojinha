const Product = require("../models/produtoModel");

exports.add = (req, res) => {
  try {
    Product.create({
      userId: req.userId,
      produto: "todinho",
      descricao: "todinho vencido no dia 20/02",
      img: "url/dhhhd",
    })
      .then((m) => res.json({ mensagem: req.userId }))
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
      .then(() => res.json({ message: "editado com sucesso" }))
      .catch((e) => res.json({ message: e }));
  } catch (e) {
    console.log(e);
  }
};
