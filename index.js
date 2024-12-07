const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const secretKey = "your-secret-key";

app.use(bodyParser.json());
app.use(passport.initialize());

// In-memory user data
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// Passport strategy for authenticating with JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    const user = users.find((u) => u.id === jwtPayload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
  };

  users.push(newUser);
  res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

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
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
