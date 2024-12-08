const ApiError = require("./api-error");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).send("Server error");
};

module.exports = errorMiddleware;
