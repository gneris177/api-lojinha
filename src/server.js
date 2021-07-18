const express = require("express");
const app = express();

const PORT = process.env.PORT || 8877;

const db = require("./database/config");

const produtoRouter = require("./routes/productRouter");

//json
app.use(express.json());

//db
db.conn();

//route
app.use(produtoRouter);

//server
app.listen(PORT, console.log("Server in http://localhost:3000"));