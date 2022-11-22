// Database
import Database from "../../classes/Database_Crud_db";
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
      permissions: {
        type: "Array",
        required: true,
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
