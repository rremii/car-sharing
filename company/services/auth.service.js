const ApiError = require("./../../api-error");
const jwt = require("jsonwebtoken");
const Company = require("../models/company.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../../mailer");

class AuthService {
  async register({ name, password, email, about }) {
    const existingUser = await Company.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError("Company with this email already exists", 400);
    }

    const newCompany = new Company();
    newCompany.name = name;
    newCompany.password = await bcrypt.hash(password, 5);
    newCompany.email = email;
    newCompany.about = about;

    const savedCompany = await newCompany.save();

    const accessToken = jwt.sign(
      {
        email: savedCompany.email,
        id: savedCompany.id,
        name: savedCompany.name,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );
    return { accessToken };
  }

  async login({ email, password }) {
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      throw new ApiError("Email or password incorrect", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, company.password);
    if (!isPasswordCorrect) {
      throw new ApiError("Email or password incorrect", 401);
    }

    const accessToken = jwt.sign(
      { email: company.email, id: company.id },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );

    return { accessToken };
  }

  async refreshToken(user) {
    const company = await Company.findOne({ where: { email: user.email } });
    if (!company) {
      throw new ApiError("Company not found", 401);
    }

    const accessToken = jwt.sign(
      { email: company.email, id: company.id, name: company.name },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );

    return { accessToken };
  }

  async sendCode({ email }) {
    const company = await Company.findOne({ where: { email } });
    if (company) {
      throw new ApiError("Company already exists", 400);
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
