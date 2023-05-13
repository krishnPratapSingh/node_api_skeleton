// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { Schema } from "mongoose";

const permissionModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * Product
     */
    const permissionSchema = new mongoose.Schema({
      liveSession: {
        create: {
          type: Boolean,
          default: false,
          required: true,
        },
        read: {
          type: Boolean,
          default: false,
          required: true,
        },
        update: {
          type: Boolean,
          default: false,
          required: true,
        },
        delete: {
          type: Boolean,
          default: false,
          required: true,
        },
      },

      // RELATIONS
      _user: {
        type: Schema.ObjectId,
        ref: "User",
      },
      // EXTERNAL RELATIONS
      /*
       */
    });

    permissionModel.setModel(
      db.connection.model("Permission", permissionSchema)
    );

    return permissionSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    permissionModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return permissionModel.model;
  },
};

export default permissionModel;
