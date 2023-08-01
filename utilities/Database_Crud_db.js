// Import Mongoose
import mongoose from "mongoose";
// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

// Start Import Models

import ProductModel from "../v1/models/Product/ProductModel";
import FlutinUserModel from "../v1/models/User/FlutinUserModel";
import UserModel from "../v1/models/User/UserModel";
import PermissionModel from "../v1/models/Permission/PermissionModel";
import LiveSessionModel from "../v1/models/LiveSession/LiveSessionModel";
import EventSessionModel from "../v1/models/EventSession/EventSessionModel";
import UserSubscriptionModel from "../v1/models/UserSubscription/UserSubscriptionModel";
import MediaModel from "../v1/models/Media/MediaModel";

// End Import Models

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info("MongoDB connected at: " + properties.crud_db_dbUrl);

    // Start Init Models

    ProductModel.init();
    UserModel.init();
    FlutinUserModel.init();
    PermissionModel.init();
    LiveSessionModel.init();
    EventSessionModel.init();
    UserSubscriptionModel.init();
    MediaModel.init();
    // End Init Models
  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");
    try {
      this.dbConnection_crud_db = await mongoose.connect(
        // "mongodb://" + properties.crud_db_dbUrl,
        properties.crud_db_dbUrl,
        { useNewUrlParser: true }
      );
    } catch (err) {
      Logger.error(`Failed connection to the DB: ${err.message}`);
      Logger.error(err);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_crud_db;
  }
}

export default new Database();
