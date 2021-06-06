const Product = require("../models/produtoModel");

exports.add = (req, res, next) => {
  try {

    Product.create({
      produto: 'todinho',
      descricao: 'todinho vencido no dia 20/02',
      img: 'url/dhhhd'
    })
    .then((m) => res.json({mensagem: idd}))
    .catch(e => res.json({e}))
  } catch (e) {
    console.log(e);
  }
};
