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

router.get(
  "/me",
  authMiddleware,
  clientController.getMe.bind(clientController)
);

router.get(
  "/car/:id/reviews",
  authMiddleware,
  clientController.getReviewsByCar.bind(clientController)
);
router.post(
  "/me/reviews",
  validator.body(reviewSchemas.createReviewSchema),
  authMiddleware,
  clientController.createReview.bind(clientController)
);
router.delete(
  "/me/reviews/:id",
  authMiddleware,
  clientController.removeReview.bind(clientController)
);

router.get(
  "/rentals/:id",
  authMiddleware,
  clientController.getRentalById.bind(clientController)
);
router.delete(
  "/me/rentals/:id",
  authMiddleware,
  clientController.removeRental.bind(clientController)
);
router.get(
  "/me/rentals",
  authMiddleware,
  clientController.getMyRentals.bind(clientController)
);
router.patch(
  "/me/rentals/:id/finish",
  authMiddleware,
  clientController.finishRental.bind(clientController)
);
router.post(
  "/me/rentals",
  validator.body(rentalSchemas.createRentalSchema),
  authMiddleware,
  clientController.createRental.bind(clientController)
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Client
 *   description: The Client API
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   schemas:
 *     TokenResponse:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: 123456
 *         name:
 *           type: string
 *           example: John Doe
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: 123456
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: Invalid email or password
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * /refresh:
 *     post:
 *       summary: Refresh a user token
 *       description: Refresh a user token
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TokenResponse'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         403:
 *           description: Forbidden
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
