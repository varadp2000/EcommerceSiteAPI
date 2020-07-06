const BookController = require("./booksController");
const auth = require("../../middleware/auth");

let bookController = BookController;

module.exports = [
  {
    path: "/app/book/test",
    method: "get",
    handler: async (req, res) => {
      return res.send("Test Pass");
    },
  },
  {
    path: "/app/book/addbook",
    method: "post",
    handler: [auth, bookController.addBook],
  },
  {
    path: "/app/user/getbook/:userid",
    method: "get",
    handler: [auth, bookController.getBookByUser],
  },
  {
    path: "/app/book/getbook/:id",
    method: "get",
    handler: [auth, bookController.getBookByID],
  },
  {
    path: "/app/book/getbooks",
    method: "get",
    handler: [auth, bookController.getAllBooks],
  },
  {
    path: "/app/book/getbookname/:name",
    method: "get",
    handler: [auth, bookController.getBookByName],
  },
  {
    path: "/app/book/getbookauther/:auther",
    method: "get",
    handler: [auth, bookController.getBookByAuther],
  },
];
