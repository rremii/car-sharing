const clientService = require("../services/client.service");
const reviewService = require("../services/review.service");
const rentalService = require("../services/rental.service");

class ClientController {
  async getMe(req, res, next) {
    try {
      const email = req?.user.email;
      if (!email) {
        return res.status(404).send({ message: "Client not found" });
      }

      const me = await clientService.getMe(email);

      return res.status(200).send(me);
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByCar(req, res, next) {
    try {
      const id = req?.params?.id;
      if (!id) {
        return res.status(404).send({ message: "Car not found" });
      }

      const reviews = await reviewService.getByCar(id);

      return res.status(200).send(reviews);
    } catch (error) {
      next(error);
    }
  }

  async createReview(req, res, next) {
    try {
      const { comment, carId } = req.body;
      const clientId = req?.user.id;

      if (!comment || !carId || !clientId) {
        return res.status(400).send({ message: "Missing required fields" });
      }

      const review = await reviewService.create({
        comment,
        carId,
        clientId,
      });

      return res.status(201).send(review);
    } catch (error) {
      next(error);
    }
  }

  async getMyRentals(req, res, next) {
    try {
      const id = req?.user.id;
      if (!id) {
        return res.status(404).send({ message: "Client not found" });
      }

      const rentals = await rentalService.getByClient(id);

      return res.status(200).send(rentals);
    } catch (error) {
      next(error);
    }
  }
  async finishRental(req, res, next) {
    try {
      const id = req?.params?.id;
      if (!id) {
        return res.status(404).send({ message: "Rental not found" });
      }

      await rentalService.finish(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async createRental(req, res, next) {
    try {
      const { carId, time, cost } = req.body;
      const clientId = req?.user.id;

      if (!carId || !time || !cost || !clientId) {
        return res.status(400).send({ message: "Missing required fields" });
      }

      const rental = await rentalService.create({
        carId,
        clientId,
        time,
        cost,
      });

      return res.status(201).send(rental);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClientController();
