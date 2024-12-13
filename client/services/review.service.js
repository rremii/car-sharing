const Review = require("../models/review.model");

class ReviewService {
  constructor() {
    this.Review = Review;
  }

  async getByCar(carId) {
    const reviews = await this.Review.findAll({
      where: { carId },
    });
    return reviews;
  }

  async create({ comment, carId, clientId }) {
    const review = await new this.Review();
    review.comment = comment;
    review.carId = carId;
    review.clientId = clientId;

    const savedReview = await review.save();

    return savedReview;
  }

  async remove(id) {
    const review = await this.Review.findByPk(id);

    if (!review) {
      throw new Error("Review not found");
    }

    return await review.destroy();
  }
}
module.exports = new ReviewService(Review);
