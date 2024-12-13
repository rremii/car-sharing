const SequelizeMock = require("sequelize-mock");
const reviewService = require("./../services/review.service");

const DBConnectionMock = new SequelizeMock();

const Review = DBConnectionMock.define("Review", {
  id: 1,
  comment: "Great car!",
  carId: 1,
  clientId: 1,
});

describe("reviewService", () => {
  const mockedReviewService = reviewService;
  mockedReviewService.Review = Review;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch reviews by car ID", async () => {
    Review.findAll.mockResolvedValue([
      { id: 1, comment: "Great car!", carId: 1, clientId: 1 },
    ]);

    const reviews = await mockedReviewService.getByCar(1);

    expect(reviews).toEqual([
      { id: 1, comment: "Great car!", carId: 1, clientId: 1 },
    ]);
    expect(Review.findAll).toHaveBeenCalledWith({ where: { carId: 1 } });
  });

  it("should create a new review", async () => {
    Review.create.mockResolvedValue({
      id: 1,
      comment: "Great car!",
      carId: 1,
      clientId: 1,
    });

    const reviewData = { comment: "Great car!", carId: 1, clientId: 1 };
    const savedReview = await mockedReviewService.create(reviewData);

    expect(savedReview).toEqual({
      id: 1,
      comment: "Great car!",
      carId: 1,
      clientId: 1,
    });
  });

  it("should delete a review by ID", async () => {
    const mockReview = { id: 1, destroy: jest.fn().mockResolvedValue() };
    Review.findByPk.mockResolvedValue(mockReview);

    await mockedReviewService.remove(1);

    expect(Review.findByPk).toHaveBeenCalledWith(1);
    expect(mockReview.destroy).toHaveBeenCalled();
  });

  it("should throw an error if review not found", async () => {
    Review.findByPk.mockResolvedValue(null);

    await expect(mockedReviewService.remove(1)).rejects.toThrow(
      "Review not found"
    );
  });
});
