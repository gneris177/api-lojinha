const user = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const senha = await bcrypt.hash(req.body.senha, salt);

    user
      .create({
        nome: req.body.nome,
        email: req.body.email,
        senha: senha,
        endereco: req.body.endereco,
        loja: req.body.loja,
        linkOnline: req.body.linkOnline,
      })
      .then(() => res.json({"mensagem":"sucesso"}))
      .catch(e => res.json(`"mensagem":"${e}"`));
    } catch(e) {
        console.log(e);
    };
};
