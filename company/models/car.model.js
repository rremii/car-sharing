const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Review = require("../../client/models/review.model");
const Rental = require("../../client/models/rental.model");

const Car = sequelize.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Car.hasMany(Review);
Review.belongsTo(Car, { through: "carId" });

Car.hasMany(Rental);
Rental.belongsTo(Car, { through: "carId" });

module.exports = Car;
