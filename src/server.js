const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const db = require("./database/config");
const mongoose = require("mongoose");

const homeRouter = require("./routes/homeRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");

const addProdutoRouter = require("./routes/addProductRouter");
const editProdutoRouter = require("./routes/editProductRouter");
const deleteProdutoRouter = require("./routes/deleteProductRouter");
const myProductRouter = require("./routes/myProductRouter"); 

//json
app.use(bodyParser.json())
app.use(express.json());

//db
mongoose
  .connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("conn"))
  .catch((e) => console.log(`erro ${e}`));

//routes
app.use(homeRouter);
app.use(registerRouter);
app.use(loginRouter);

app.use(addProdutoRouter);
app.use(deleteProdutoRouter);
app.use(editProdutoRouter);
app.use(myProductRouter);


//server
app.listen(7000, console.log("Server rodando em localhost:7000"));
