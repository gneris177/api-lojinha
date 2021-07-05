const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const db = require("./database/config");
const mongoose = require("mongoose");

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const produtoRouter = require("./routes/productRouter");
const productsPublicRouter = require("./routes/productsPublicRouter");

//json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//db
mongoose
  .connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("conn"))
  .catch((e) => console.log(`erro ${e}`));

//routes
app.use(registerRouter);
app.use(loginRouter);
app.use(productsPublicRouter);
app.use(produtoRouter);

//server
app.listen(7000, console.log("Server rodando em localhost:7000"));
