import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import routes from "./routes";
import Config from "./config/Config";
import { NotFoundError } from "./utils/ApiError";
import ErrorHandler from "./middlewares/ErrorHandler";
import { Sequelize } from "sequelize-typescript";
import connection from "./services/SequelizeClient";
const dotenv = require("dotenv");

dotenv.config();

const app: Application = express();
const PORT = Config.port || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) =>
  next(new NotFoundError(req.path))
);

app.use(ErrorHandler.handle());

let server: http.Server;
let dbClient: Sequelize | undefined;

const startServer = async () => {
  try {
    dbClient = await connection.sync();
    server = app.listen(PORT, (): void => {
      console.log(`Connected successfully on port ${PORT}`);
    });
    if (dbClient) {
      console.log("Database connection successful");
    }
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
  }
};

startServer();

ErrorHandler.initializeUnhandledException();

app.get("/", (req, res) => {
  res.send("Welcome to Ducky Project - chuongdev");
});

app.get("/user", (req, res) => {
  return res.status(200).send("Hello I am Chuongdev!");
});

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (dbClient) dbClient.close();
  if (server) server.close();
});
