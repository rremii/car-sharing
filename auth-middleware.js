const passport = require("passport");

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

module.exports = { authMiddleware };
