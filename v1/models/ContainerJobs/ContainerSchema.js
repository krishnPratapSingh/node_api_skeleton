// Database
import Database from "../../classes/Database_Crud_db";
import mongoose from "mongoose";

// Logger
import Logger from "../../classes/Logger";

const ContainerJobModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * User
     */
    const ContainerJobSchema = new mongoose.Schema({
      containerName: {
        type: "String",
        required: true,
      },
      jobStatus: {
        type: "String",
        required: true,
        enum: ["pending", "scheduled"],
      },
      jobScheduledAt: {
        type: Date,
      },
    });

    ContainerJobModel.setModel(
      db.connection.model("ContainerJob", ContainerJobSchema)
    );

    return ContainerJobSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    ContainerJobModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return ContainerJobModel.model;
  },
};

export default ContainerJobModel;
