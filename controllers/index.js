const authRoutes = require("./authAPI/routes");
const userRoutes = require("./userAPI/routes");
const bookRoutes = require("./booksAPI/routes");

module.exports = [...authRoutes, ...userRoutes, ...bookRoutes];
