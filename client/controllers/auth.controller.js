const authService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      const { accessToken } = await authService.register({
        email,
        password,
        name,
      });

      res.status(200).send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { accessToken } = await authService.login({ email, password });

      res.status(200).send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      console.log(req.user);

      const { accessToken } = await authService.refreshToken(req.user);

      res.status(200).send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async sendCode(req, res, next) {
    try {
      const { email } = req.body;
      const { code } = await authService.sendCode({ email });

      res.status(200).send({ code });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
