exports.register = (req, res, next) => {
  try {
    const registerModel = require("../models/registerModel");
    registerModel
      .create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        bairro: req.body.bairro,
        endereco: req.body.endereco,
        loja: req.body.loja,
        linkOnline: req.body.linkOnline,
      })
      .then(() => res.send({"mensagem":"sucesso"}))
      .catch(e => res.send(`"mensagem":"${e}"`));
  } catch (error) {
    console.log(error)
  };
};