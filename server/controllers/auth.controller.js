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
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "user not found!"));
    }
    //! comparing hashed password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "invalid login credentials!"));
    }
    //! generate the token
    const token = jwt.sign({ id: validUser._id }, "process.env.JWT_SECRET_KEY");
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    return next(errorHandler(500, "something went wrong while sign in"));
  }
};
module.exports = { signup, Signin };