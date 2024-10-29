const express = require("express");
const cors = require("cors");
const database = require("./config/db");
const userRouter = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
require("dotenv").config();
const app = express();
//? database connect to index
database();

//! middilewares
app.use(express.json());
app.use(cors());

//routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("server is up and running");
});
