const ApiError = require("../../api-error");
const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../../mailer");

class ClientService {
  async getMe(email) {
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      throw new ApiError("Client not found", 401);
    }

    return client;
  }
}

module.exports = new ClientService();
