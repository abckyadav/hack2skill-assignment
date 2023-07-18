const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = () => {
  return mongoose.connect(process.env.MongoDbURL);
};

module.exports = connectMongoDB;
