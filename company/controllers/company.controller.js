const companyService = require("../services/company.service");
const carsService = require("../services/car.service");

class CompanyController {
  async getMe(req, res, next) {
    try {
      const email = req?.user.email;
      if (!email) {
        return res.status(404).send({ message: "Company not found" });
      }

      const me = await companyService.getMe(email);

      return res.status(200).send(me);
    } catch (error) {
      next(error);
    }
  }

  async getMyCars(req, res, next) {
    try {
      const id = req?.user.id;
      if (!id) {
        return res.status(404).send({ message: "Company not found" });
      }

      const cars = await carsService.getByCompany(id);

      return res.status(200).send(cars);
    } catch (error) {
      next(error);
    }
  }

  async getCarById(req, res, next) {
    try {
      const id = req?.params?.id;
      if (!id) {
        return res.status(404).send({ message: "Car not found" });
      }

      const car = await carsService.getById(id);

      return res.status(200).send(car);
    } catch (error) {
      next(error);
    }
  }

  async createCar(req, res, next) {
    try {
      const { brand, model, lat, lng } = req.body;
      const id = req?.user.id;
      if (!id) {
        return res.status(404).send({ message: "Company not found" });
      }

      const car = await carsService.create({
        brand,
        model,
        lat,
        lng,
        companyId: id,
      });

      return res.status(201).send(car);
    } catch (error) {
      next(error);
    }
  }

  async getAvailableCars(req, res, next) {
    try {
      const cars = await carsService.getAvailableCars();

      return res.status(200).send(cars);
    } catch (error) {
      next(error);
    }
  }

  async removeCar(req, res, next) {
    try {
      const id = req?.params?.id;
      if (!id) {
        return res.status(404).send({ message: "Car not found" });
      }

      await carsService.remove(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CompanyController();
