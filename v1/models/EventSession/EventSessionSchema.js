// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { Schema } from "mongoose";

const eventSessionModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * EventSession
     */
    const eventSessionSchema = new mongoose.Schema({
      eventSnapShot: Object,
    });

    eventSessionModel.setModel(
      db.connection.model("EventSession", eventSessionSchema)
    );

    return eventSessionSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    eventSessionModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return eventSessionModel.model;
  },
};

export default eventSessionModel;
