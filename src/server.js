const express = require("express");
const app = express();

const db = require("./database/config");

const produtoRouter = require("./routes/productRouter");

//json
app.use(express.json());

//db
db.conn();

//route
app.use(produtoRouter);

//server
app.listen(3000, console.log("Server in http://localhost:3000"));