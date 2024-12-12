const { DataTypes } = require("sequelize");
const sequelize = require("./../../db");

const Review = require("./review.model");
const Rental = require("./rental.model");

const Client = sequelize.define("Client", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Client.hasMany(Review);
Review.belongsTo(Client, { through: "clientId" });

Client.hasMany(Rental);
Rental.belongsTo(Client, { through: "clientId" });

module.exports = Client;
