const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error.handler");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      const error = new Error("Username, email, and password are required.");
      error.statusCode = 400;
      return next(error); // Pass the error to the error handler
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "user already exist!"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    return next(errorHandler(400, "something went wrong while creating user!"));
  }
};

//!login controllers
const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //! is exist user is
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return next(errorHandler(400, "user not found!"));
    }
    //! comparing hashed password
    const isPasswordMatch = bcrypt.compareSync(password, existUser.password);
    if (!isPasswordMatch) {
      return next(errorHandler(400, "invalid login credentials!"));
    }
    //! generate the token
    const token = jwt.sign({ id: existUser._id }, "process.env.JWT_SECRET_KEY");
    return res.json({
      message: "log in success1",
      user: existUser,
      tokon: token,
    });
  } catch (error) {
    return next(errorHandler(500, "something went wrong while sign in"));
  }
};
module.exports = { signup, Signin };
