const UserController = require("./userController");
const auth = require("../../middleware/auth");

let userController = UserController;

module.exports = [
  {
    path: "/app/user/register",
    method: "post",
    handler: async (req, res) => {
      await userController.register(req, res);
    },
  },
  {
    path: "/app/user/test",
    method: "get",
    handler: async (req, res) => {
      return res.send("Test Pass");
    },
  },
];
