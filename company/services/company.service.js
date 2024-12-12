const ApiError = require("../../api-error");
const Company = require("../models/company.model");

class CompanyService {
  async getMe(email) {
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      throw new ApiError("Company not found", 401);
    }
    return company;
  }
}

module.exports = new CompanyService();
