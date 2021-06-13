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
const listProductsRouter = require("./routes/listProductsRouter"); 
const createClient = require("./routes/createClientRouter"); 
const charge = require("./routes/chargeRouter"); 

//json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


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
app.use(listProductsRouter);
app.use(createClient);
app.use(charge);



//server
app.listen(7000, console.log("Server rodando em localhost:7000"));
