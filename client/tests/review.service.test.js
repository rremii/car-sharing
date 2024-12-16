const ReviewService = require("./../services/review.service");

describe("reviewService", () => {
  let reviewService;

  beforeEach(() => {
    jest.clearAllMocks();

    const Review = {
      findByPk: () => ({
        id: 1,
        comment: "Great car!",
        carId: 1,
        clientId: 1,
        destroy: () => true,
      }),
      findAll: () => {
        return JSON.stringify([
          {
            id: 1,
            comment: "Great car!",
            carId: 1,
            clientId: 1,
            destroy: () => true,
          },
        ]);
      },
      destroy: () => true,
      save: () => ({ id: 1, comment: "Great car!", carId: 1, clientId: 1 }),
    };

    reviewService = new ReviewService(Review);
  });

  it("should fetch reviews by car ID", async () => {
    const reviews = await reviewService.getByCar(1);

    expect(reviews).toEqual(
      JSON.stringify([
        {
          id: 1,
          comment: "Great car!",
          carId: 1,
          clientId: 1,
          destroy: () => true,
        },
      ])
    );
  });

  it("should delete a review by ID", async () => {
    const result = await reviewService.remove(1);

    expect(result).toBe(true);
  });
});
