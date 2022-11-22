// Express
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import path from "path";

// Logging
import Logger from "./Logger";

// Properties
import properties from "../../properties.js";

// Security
import cors from "cors";
import helmet from "helmet";

// Database
import Database_Crud_db from "./Database_Crud_db.js";

// Routes
import SecurityRoutes from "../routes/SecurityRoutes";
import UserRoutes from "../routes/UserRoutes";
import ProductRoutes from "../routes/ProductRoutes";
import PublicRoutes from "../routes/PublicRoutes";

class Server {
  constructor() {
    this.app = express();
  }

  // Start the server
  async init() {
    Logger.info("Starting Server");

    // Start Init Database
    Database_Crud_db.init();
    // End Init Database

    // Add parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(Logger.expressMiddleware);

    // Securitiy
    this.app.use(helmet());
    this.app.use(cors());

    // Start App Server
    const server = http.Server(this.app);
    this.app.use(express.static(properties.publicPath));

    await server.listen(properties.port);
    Logger.info("Server started on port " + properties.port);

    this.app.use("/v1", SecurityRoutes); // for security
    this.app.use("/v1", ProductRoutes); // for products
    this.app.use("/v1", UserRoutes); // for users
    this.app.use("/v1", PublicRoutes); // for public
  }
}

export default new Server();
