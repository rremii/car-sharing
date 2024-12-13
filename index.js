require("dotenv").config();
const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const clientRouter = require("./client/routes");
const companyRouter = require("./company/routes");
const errorMiddleware = require("./error-middleware");
const cors = require("cors");
const loggerMiddleware = require("./logger-middleware");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(loggerMiddleware);
app.use("/client", clientRouter);
app.use("/company", companyRouter);
app.use(errorMiddleware);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    console.log(jwtPayload);
    const user = {
      id: jwtPayload.id,
      email: jwtPayload.email,
    };

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
