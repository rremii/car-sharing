const authController = require("./controllers/auth.controller");
const { authMiddleware } = require("../auth-middleware");
const clientController = require("./controllers/client.controller");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authMiddleware, authController.refreshToken);
router.post("/send-code", authController.sendCode);

router.get("/me", authMiddleware, clientController.getMe);

router.get(
  "/reviews/car/:id",
  authMiddleware,
  clientController.getReviewsByCar
);
router.post("/me/reviews", authMiddleware, clientController.createReview);

router.get("/me/rentals", authMiddleware, clientController.getMyRentals);
router.patch(
  "/me/rentals/:id/finish",
  authMiddleware,
  clientController.finishRental
);
router.post("/me/rentals", authMiddleware, clientController.createRental);

module.exports = router;
