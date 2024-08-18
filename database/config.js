const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    // dbUserHospital
    // v5mcYY9wQUoNO2u2

    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    
    await mongoose.connect(
      process.env.DB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la DB. Ver logs");
  }
};

module.exports = {
  dbConnection,
};
