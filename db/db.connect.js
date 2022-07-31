const mongoose = require("mongoose");
const initializeDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@amplifycluster.qhvwk.mongodb.net/test`
    );
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { initializeDatabase };
