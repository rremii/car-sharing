const ApiError = require("./../../api-error");
const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../../mailer");

class AuthService {
  async register({ name, password, email }) {
    const existingUser = await Client.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError("Client with this email already exists", 400);
    }

    const newClient = await new Client();
    newClient.name = name;
    newClient.password = await bcrypt.hash(password, 5);
    newClient.email = email;

    const savedClient = await newClient.save();

    const accessToken = jwt.sign(
      {
        email: savedClient.email,
        id: savedClient.id,
        name: savedClient.name,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );
    return { accessToken };
  }

  async login({ email, password }) {
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      throw new ApiError("Email or password incorrect", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, client.password);
    if (!isPasswordCorrect) {
      throw new ApiError("Email or password incorrect", 401);
    }

    const accessToken = jwt.sign(
      { email: client.email, id: client.id, name: client.name },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );

    return { accessToken };
  }

  async refreshToken(user) {
    const client = await Client.findOne({ where: { email: user.email } });
    if (!client) {
      throw new ApiError("Client not found", 401);
    }

    const accessToken = jwt.sign(
      { email: client.email, id: client.id, name: client.name },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );

    return { accessToken };
  }

  async sendCode({ email }) {
    const client = await Client.findOne({ where: { email } });
    if (client) {
      throw new ApiError("Client already exists", 400);
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));

    const mailOptions = {
      from: '"YCar sharing', // sender address
      to: email, // list of receivers
      subject: "Your code", // Subject line
      text: `Your code is ${code}`, // plain text body
      html: `<b>code is ${code}</b>`,
    };

    await sendMail(mailOptions);

    return { code };
  }
}

module.exports = new AuthService();
