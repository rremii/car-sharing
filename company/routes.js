const authController = require("./controllers/auth.controller");
const { authMiddleware } = require("../auth-middleware");
const companyController = require("./controllers/company.controller");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-code", authController.sendCode);
router.post("/refresh", authMiddleware, authController.refreshToken);

router.get("/me", authMiddleware, companyController.getMe);

router.get("/car", authMiddleware, companyController.getAvailableCars);
router.get("/car/:id", authMiddleware, companyController.getCarById);
router.get("/me/car", authMiddleware, companyController.getMyCars);
router.post("/me/car", authMiddleware, companyController.createCar);
router.delete("/me/car/:id", authMiddleware, companyController.removeCar);

module.exports = router;
