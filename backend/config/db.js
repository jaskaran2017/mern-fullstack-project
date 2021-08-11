// now we are going to connect to mongo database with the help of mongoose
const mongoose = require("mongoose");
const key = require("../keys");
// require("dotenv").config({ path: "../.env" });
// const MONGO_URI = require("../.env");
// const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(key.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MogoDB connected:${conn.connection.host}`);
  } catch (error) {
    console.error(`ERROR:${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
