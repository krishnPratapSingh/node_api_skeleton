// Express
import express, { response } from "express";
import http, { request } from "http";
import bodyParser from "body-parser";
import path from "path";

// Logging
import Logger from "./Logger";

// Properties
import properties from "../properties.js";

// Security
import cors from "cors";
import helmet from "helmet";

// Database
import Database_Crud_db from "./Database_Crud_db.js";

// Routes v1
import SecurityRoutes from "../v1/routes/SecurityRoutes";
import UserRoutes from "../v1/routes/UserRoutes";
import ProductRoutes from "../v1/routes/ProductRoutes";
import PublicRoutes from "../v1/routes/PublicRoutes";

class Server {
  constructor() {
    this.app = express();
    this.cors = {
      origin: "http://localhost:3011", // Allow requests from this origin
      methods: "GET,POST", // Allow specified HTTP methods
      allowedHeaders: "Content-Type,Authorization", // Allow specified headers
      exposedHeaders: "Content-Length", // Expose specified headers
      credentials: true, // Enable sending cookies and HTTP authentication
      maxAge: 86400, // Cache preflight requests for 24 hours
      preflightContinue: false, // Disable handling of preflight OPTIONS requests
      optionsSuccessStatus: 204, // Return 204 No Content for OPTIONS requests
    };
    this.r = express.Router();
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
    this.app.use(cors(this.cors));

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