const express = require("express");
var app = express();
const db = require("./config/db.js");
const dotenv = require("dotenv");
const http = require("http");

const routes = require("./controllers");
const { applyRoutes } = require("./utils");

dotenv.config();
db();
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express();
router.use(cors());
router.use(bodyParser());
applyRoutes(routes, router);
const server = http.createServer(router);

const port = 4000 || process.env.PORT;

server.listen(port, () =>
  console.log("App Listening on http://localhost:4000")
);
