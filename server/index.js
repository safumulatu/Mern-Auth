const express = require("express");
const database = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());

// database connect to index
database();

app.listen(3000, () => {
  console.log("server is up and running");
});
