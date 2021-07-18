require("dotenv").config();
const cors = require('cors');

const express = require("express");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8877;

//db
const db = require("./database/config");
db.conn();

//routes
const produtoRouter = require("./routes/productRouter");
app.use(produtoRouter);

app.use(express.json());
app.listen(PORT, console.log("Server ON"));