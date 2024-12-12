class ReviewService {
  async getByCar(carId) {
    const reviews = await Review.findAll({
      where: { carId },
    });
    return reviews;
  }

  async create({ comment, carId, clientId }) {
    const review = await new Review();
    review.comment = comment;
    review.carId = carId;
    review.clientId = clientId;

    const savedReview = await review.save();

    return savedReview;
  }
}
