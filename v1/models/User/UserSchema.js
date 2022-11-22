// Database
import Database from "../../classes/Database_Crud_db";
import mongoose from "mongoose";

// Logger
import Logger from "../../classes/Logger";

const userModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * User
     */
    const userSchema = new mongoose.Schema({
      email: {
        type: "String",
      },
      first_name: {
        type: "String",
      },
      last_name: {
        type: "String",
      },
      password: {
        type: "String",
        required: true,
      },
      roles: [
        {
          type: "String",
        },
      ],
      surname: {
        type: "String",
      },
      username: {
        type: "String",
        required: true,
      },
      // RELATIONS

      // EXTERNAL RELATIONS
      /*
       */
    });

    userModel.setModel(db.connection.model("User", userSchema));
    userModel.createAdminUser();

    return userSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    userModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return userModel.model;
  },

  /**
   * Create ADMIN user if it not exists
   */
  createAdminUser: async () => {
    const count = await userModel.model.collection.countDocuments();
    if (count == 0) {
      Logger.info("Creating admin user");
      var admin = new userModel.model({
        username: "lebara_admin",
        password:
          "$2a$12$W7gFYcuJh2uLN0/zsPAo4u8ZenbulAzh79YcMffWp2fqhUv46dCOK",
        roles: ["ADMIN"],
      });
      const adminUser = await admin.save();
      if (adminUser) {
        Logger.info("Admin user Created:");
        Logger.info(`username: ${adminUser.username}`);
        Logger.info("password: admin");
      }
    }
  },
};

export default userModel;
