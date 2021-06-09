const Product = require("../models/produtoModel");

exports.add = (req, res, next) => {
  try {
    req.header

    Product.create({
      id: req.userId,
      produto: 'todinho',
      descricao: 'todinho vencido no dia 20/02',
      img: 'url/dhhhd'
    })
    .then((m) => res.json({mensagem: req.userId}))
    .catch(e => res.send(e))
  } catch (e) {
    console.log(e);
  }
};
