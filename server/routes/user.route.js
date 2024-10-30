const express = require("express");
const { registerUser } = require("../controllers/user.controllers");
const { Signin } = require("../controllers/auth.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/signin", Signin);

module.exports = userRouter;