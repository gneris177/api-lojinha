const request = require('request-promise')

module.exports = async () => {
  //boleto
  request(
    {
      method: "POST",
      url: "https://sandbox.asaas.com/api/v3/payments",
      headers: {
        "Content-Type": "application/json",
        access_token: process.env.pss,
      },
      body: `{  "customer": ${user.idCustom},  "billingType": BOLETO,  "dueDate": ${dueDate},  "value": ${value},  "description": "uma descrição"}`,
    },
    function (error, response, body) {
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
    }
  );
};
