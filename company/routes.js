const authController = require("./controllers/auth.controller");
const { authMiddleware } = require("../auth-middleware");
const companyController = require("./controllers/company.controller");
const validator = require("./../validator");
const authSchemas = require("./schemas/auth.schema");
const carsSchemas = require("./schemas/cars.schema");

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
router.post(
  "/send-code",
  validator.body(authSchemas.codeSchema),
  authController.sendCode
);
router.post("/refresh", authMiddleware, authController.refreshToken);

router.get("/me", authMiddleware, companyController.getMe);

router.get("/car", authMiddleware, companyController.getAvailableCars);
router.get("/car/:id", authMiddleware, companyController.getCarById);
router.get("/me/car", authMiddleware, companyController.getMyCars);
router.post(
  "/me/car",
  validator.body(carsSchemas.createCarSchema),
  authMiddleware,
  companyController.createCar
);
router.delete("/me/car/:id", authMiddleware, companyController.removeCar);

module.exports = router;
