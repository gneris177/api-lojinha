const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("request-promise");

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      businessAdress,
      businessName,
      businessOnline,
      businesstype,
      cnpj,
      phone,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const pss = await bcrypt.hash(password, salt);

    const register = await user
      .create({
        idCustom: "",
        name: name,
        email: email,
        phone: phone,
        password: pss,
        businessAdress: businessAdress,
        businessName: businessName,
        businessOnline: businessOnline,
        businesstype: businesstype,
      })
      .then((usr) => (req.id = usr._id))
      .catch((err) => res.status(400).json({ message: err }));

    //acount to payment
    request(
      {
        method: "POST",
        url: "https://sandbox.asaas.com/api/v3/customers",
        headers: {
          "Content-Type": "application/json",
          access_token: process.env.pss,
        },
        body: `{  \"name\": \"${name}\",  \"email\": \"${email}\",  \"phone\": \"${phone}\",  \"cpfCnpj\": \"${cnpj}\"}`,
      },
      async (error, response, body) => {
        if (error) res.status(400).json(error);

        const obj = await JSON.parse(body);
        const idCustom = obj.id;

        const userCustom = await user
          .findByIdAndUpdate(
            req.id,
            { idCustom: idCustom },
            { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
          )
          .catch((err) => res.status(400).json({ message: err }));
      }
    );

    return res.status(200).json({ message: "sucess" });
  } catch (e) {
    res.send(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //search email
    user.find({ email: email }, async (err, result) => {
      if (result.length < 1) {
        res.status(401).json({ message: "authentication failed" });
      }

      //valid password
      const validPassword = await bcrypt.compare(password, result[0].password);

      if (!validPassword) {
        res.status(401).json({ message: "authentication failed" });
      } else {
        const token = jwt.sign(
          { email: result.email, id: result._id },
          process.env.JWT_SECRET,
          { expiresIn: "100d" }
        );

        req.params.id = result._id;
        res.status(200).json({ message: "sucess", token: token });
      }
    });
  } catch (e) {
    res.json({ message: e });
  }
};
