const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //! hashing the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //! Check if any of the required fields are missing
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "please fill all the required information." });
    }

    //! Example: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    // // check if password length is less than 8 character
    // if (password.length < 8) {
    //   return res
    //     .status(400)
    //     .json({ message: "password character must be greater or equal to 8" });
    // }
    //! Example: Create the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
module.exports = { signup };
