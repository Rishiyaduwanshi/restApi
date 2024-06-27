require("dotenv").config({path : "../../.env"});
const mongoose = require("mongoose");
const { DB_NAME } = require("../constant");

const connectDB = async () => {
  try {
    const mongoInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("MongoDB connected !! DB HOST: " + mongoInstance.connection.host);
  } catch (err) {
    console.error("MongoDB connection failed -->  " + err);
    process.exit(1);
  }
};

connectDB()

module.exports = {
    connectDB
}

































