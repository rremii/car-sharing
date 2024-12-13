const Rental = require("../models/rental.model");
const ApiError = require("../../api-error");

class RentalService {
  async create({ carId, clientId, time, cost }) {
    const rental = new Rental();
    rental.carId = carId;
    rental.clientId = clientId;
    rental.time = time;
    rental.cost = cost;

    const savedRental = await rental.save();

    return savedRental;
  }

  async getById(id) {
    const rental = await Rental.findByPk(id);
    if (!rental) {
      throw new ApiError("Rental not found", 404);
    }
    return rental;
  }
  async removeRental(id) {
    const rental = await Rental.findByPk(id);
    if (!rental) {
      throw new ApiError("Rental not found", 404);
    }

    return await rental.destroy();
  }

  async finish(id) {
    const rental = await Rental.findByPk(id);
    if (!rental) {
      throw new ApiError("Rental not found", 404);
    }

    rental.status = "finished";

    await rental.save();
  }

  async getByClient(id) {
    const rentals = await Rental.findAll({
      where: { clientId: id },
    });
    return rentals;
  }
}

module.exports = new RentalService();
