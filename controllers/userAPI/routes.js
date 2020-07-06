const UserController = require("./userController");
const auth = require("../../middleware/auth");

let userController = UserController;

module.exports = [
  {
    path: "/app/user/details",
    method: "post",
    handler: [auth, userController.details],
  },
  {
    path: "/app/user/wishlist/:userid",
    method: "get",
    handler: [auth, userController.getWishList],
  },
  {
    path: "/app/user/addtowishlist",
    method: "post",
    handler: [auth, userController.addToWishList],
  },
  {
    path: "/app/user/addtocart",
    method: "post",
    handler: [auth, userController.addToCart],
  },
  {
    path: "/app/user/clearcart/:cartid",
    method: "get",
    handler: [auth, userController.clearCart],
  },
  {
    path: "/app/user/getcart/:userid",
    method: "get",
    handler: [auth, userController.getCart],
  },
];
