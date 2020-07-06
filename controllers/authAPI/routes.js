const AuthController = require("./authController");
const auth = require("../../middleware/auth");

let authController = AuthController;

module.exports = [
  {
    path: "/app/auth/register",
    method: "post",
    handler: async (req, res) => {
      await authController.register(req, res);
    },
  },
  {
    path: "/app/auth/login",
    method: "post",
    handler: async (req, res) => {
      await authController.login(req, res);
    },
  },
];
