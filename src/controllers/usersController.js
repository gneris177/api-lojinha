const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    //busca e verifica email
    const user = await User.findOne({ email: email }).exec();
    if (user.length < 1 || user == undefined) {
      res.status(401).json({ mensagem: "Falha na autenticação" });
    }

    //valida senha
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      res.status(401).json({ mensagem: "Falha na autenticação" });
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "100d",
        }
      );

      req.params.id = user._id;
      res.status(200).json({ mensagem: "sucesso", token});
    }
  } catch (e) {
    res.json({ mensagem: "erro ao fazer login" });
  }
};
