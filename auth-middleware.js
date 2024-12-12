const passport = require("passport");

const authMiddleware = (req, res, next) => {
  const authenticate = passport.authenticate("jwt", { session: false });
  return authenticate(req, res, next);
};

module.exports = { authMiddleware };
