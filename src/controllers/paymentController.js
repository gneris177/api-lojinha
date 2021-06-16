const request = require("request");

exports.createClient = (req, res) => {
  try {
    const { name, cnpj } = req.body;

    request(
      {
        method: "POST",
        url: "https://www.asaas.com/api/v3/customers",
        headers: {
          "Content-Type": "application/json",
          access_token: process.env.pss,
        },
        body: `{ "name": ${name}, "cpfCnpj": ${cnpj} }`,
      },
      (error, response, body) => {
        res.status(200).json({ message: body });
        res.status(400).json({ message: error });
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.charge = (req, res) => {
  try {
    const { customer, value, dueDate, description } = req.body;

    request(
      {
        method: "POST",
        url: "https://www.asaas.com/api/v3/payments",
        headers: {
          "Content-Type": "application/json",
          access_token: process.env.pss,
        },
        body: `{"customer": ${customer}, "billingType": "BOLETO", "dueDate": ${dueDate}, "value": ${value}, "description": ${description} }`,
      },
      (error, response, body) => {
        res.status(200).json({ message: body });
        res.status(400).json({ message: error });
      }
    );
  } catch (e) {
    console.log(e);
  }
};
