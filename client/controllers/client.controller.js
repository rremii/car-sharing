class ClientController {
  async getMe(req, res, next) {
    try {
      const me = req.user;
      if (!me) {
        return res.status(404).send({ message: "Client not found" });
      }
      return res.status(200).send(me);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClientController();
