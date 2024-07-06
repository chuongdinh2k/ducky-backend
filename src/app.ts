const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server 123");
});

app.get("/user", (req, res) => {
  return res.status(200).send("Hello I am Chuongdev!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
