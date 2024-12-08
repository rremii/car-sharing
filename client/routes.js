const passport = require("passport");
const authController = require("./controllers/auth.controller");
const { authMiddleware } = require("../auth-middleware");
const clientController = require("./controllers/client.controller");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authMiddleware, authController.refreshToken);
router.post("/send-code", authController.sendCode);

router.get("/me", authMiddleware, clientController.getMe);

module.exports = router;
