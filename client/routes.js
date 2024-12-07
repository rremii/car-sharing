const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const sequelize = require("./database");
const User = require("./user.model");

const app = express();
const port = 3000;

const secretKey = "your-secret-key";

app.use(bodyParser.json());
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const newUser = await User.create({ username, password });
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        secretKey,
        { expiresIn: "1h" }
      );
      res.json({ accessToken });
    } else {
      res.status(401).send("Username or password incorrect");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
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
