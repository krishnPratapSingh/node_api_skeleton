// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { mongo, Schema } from "mongoose";

// Logger
import Logger from "../../../utilities/Logger";

const mediaModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * User
     */
    const mediaSchema = new mongoose.Schema({
      locationUrl: {
        type: "String",
        required: true,
      },
      name: {
        type: "String",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      duration: Number,
      thumbnail: String,
      order: Number,
      size: Number,
      uploadedName: String,
      locationUrl: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
      deletedAt: { type: Date },
      mediaType: {
        type: String,
      },
      // RELATIONS
      _artist: {
        type: Schema.ObjectId,
        ref: "User",
      },
    });

    mediaModel.setModel(db.connection.model("Media", mediaSchema));

    return mediaSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    mediaModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return mediaModel.model;
  },

  /**
   * Create ADMIN user if it not exists
   */
};

export default mediaModel;
