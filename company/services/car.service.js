const ApiError = require("../../api-error");
const { Op, where } = require("sequelize");
const Car = require("../models/car.model");
const Rental = require("../../client/models/rental.model");

class CarService {
  async getByCompany(companyId) {
    const cars = await Car.findAll({
      where: { companyId },
    });
    return cars;
  }

  async expireRentals() {
    return await Rental.update(
      { status: "finished" },
      {
        where: {
          [Op.and]: [
            { status: "active" },
            {
              time: {
                [Op.lt]: new Date(),
              },
            },
          ],
        },
      }
    );
  }

  async getAvailableCars() {
    await this.expireRentals();

    const cars = await Car.findAll();
    const rentals = await Rental.findAll();

    const filteredCars = cars.filter((car) => {
      const hasActiveRental = rentals.some((rental) => {
        return rental.carId === car.id && rental.status === "active";
      });

      return !hasActiveRental;
    });

    return filteredCars;
  }

  async getById(id) {
    const car = await Car.findByPk(id);
    if (!car) {
      throw new ApiError("Car not found", 404);
    }
    return car;
  }

  async create({ brand, model, lat, lng, companyId }) {
    const car = await new Car();
    car.brand = brand;
    car.model = model;
    car.lat = lat;
    car.lng = lng;
    car.companyId = companyId;

    const savedCar = await car.save();

    return savedCar;
  }

  async remove(id) {
    const car = await Car.findByPk(id);
    if (!car) {
      throw new ApiError("Car not found", 404);
    }

    await car.destroy();
  }
}
module.exports = new CarService();
