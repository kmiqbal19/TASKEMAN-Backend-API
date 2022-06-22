const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DB_URL = process.env.MONGODB_URL.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

const connectDB = async () => {
  try {
    const response = await mongoose.connect(DB_URL);
    console.log(
      `Database connected to: ${response.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
