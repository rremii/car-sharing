module.exports = function (req, res, next) {
  console.info("MY LOGGER: ", req.method, req.url);
  next();
};
