const cron = require("node-cron");

const autoDelete = () => {
  console.log('olha eu')
  Product.findByIdAndDelete(product.id)
    .then(() => jobStop())
    .catch((e) => console.log(e));
};

module.exports = cron.schedule("*/1 * * * *", autoDelete, { scheduled: false });
