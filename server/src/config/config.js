require("dotenv").config();

const config = {
  port: process.env.PORT || 4400,
  secret: process.env.JWT_SECRET || "Your secret key",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/mernproject",
};

module.exports = config;
