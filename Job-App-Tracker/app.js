require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");

const server = jsonServer.create();

const dbData = require("./db.json");

const fs = require("fs");
const db = JSON.parse(fs.readFileSync("db.json"));
const router = jsonServer.router(dbData);

const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
