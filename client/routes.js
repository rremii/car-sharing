const authController = require("./controllers/auth.controller");
const { authMiddleware } = require("../auth-middleware");
const clientController = require("./controllers/client.controller");
const validator = require("./../validator");
const authSchemas = require("./schemas/auth.schema");
const reviewSchemas = require("./schemas/reviews.schema");
const rentalSchemas = require("./schemas/rentals.schema");

const router = require("express").Router();

router.post(
  "/register",
  validator.body(authSchemas.registerSchema),
  authController.register
);
router.post(
  "/login",
  validator.body(authSchemas.loginSchema),
  authController.login
);
router.post("/refresh", authMiddleware, authController.refreshToken);
router.post(
  "/send-code",
  validator.body(authSchemas.codeSchema),
  authController.sendCode
);

router.get("/me", authMiddleware, clientController.getMe);

router.get(
  "/car/:id/reviews",
  authMiddleware,
  clientController.getReviewsByCar
);
router.post(
  "/me/reviews",
  validator.body(reviewSchemas.createReviewSchema),
  authMiddleware,
  clientController.createReview
);
router.delete("/me/reviews/:id", authMiddleware, clientController.removeReview);

router.get("/rentals/:id", authMiddleware, clientController.getRentalById);
router.delete("/me/rentals/:id", authMiddleware, clientController.removeRental);
router.get("/me/rentals", authMiddleware, clientController.getMyRentals);
router.patch(
  "/me/rentals/:id/finish",
  authMiddleware,
  clientController.finishRental
);
router.post(
  "/me/rentals",
  validator.body(rentalSchemas.createRentalSchema),
  authMiddleware,
  clientController.createRental
);

module.exports = router;
