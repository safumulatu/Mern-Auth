const mongoose = require("mongoose");
const database = () => {
  const mongoURI = process.env.MONGODB_URI; // Make sure this is set in your .env file

  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};
module.exports = database;
