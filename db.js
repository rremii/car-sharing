const { Sequelize } = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize("database_name", "username", "password", {
  host: "localhost",
  dialect: "postgres", // Choose 'postgres' as the dialect
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDB();

module.exports = sequelize;
