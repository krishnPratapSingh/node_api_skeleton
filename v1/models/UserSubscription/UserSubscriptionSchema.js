// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { mongo, Schema } from "mongoose";

// Logger
import Logger from "../../../utilities/Logger";

const userSubscriptionModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * User
     */
    const userSubscriptionSchema = new mongoose.Schema({
      _userId: {
        type: Schema.ObjectId,
        ref: "User",
      },
      status: {
        type: "String",
        enum: ["active", "inActive"],
        default: "active",
        required: true,
      },
      subscription: {
        startDate: Number,
        endDate: Number,
        package: {
          type: "String",
          enum: ["month", "year", "lifetime"],
        },
        canceled: {
          type: Boolean,
          default: false,
        },
        planId: {
          type: "String",
          ref: "Subscription",
        }, // PlanID from APPSUMO
        uuid: String, // uuid from APPSUMO
        subscriptionFrom: {
          type: "String",
          default: "null",
          enum: [
            "stripe",
            "appSumo",
            "null",
            null,
            "flutinDirect",
            "flutinDirectUpgrade",
            "flutin",
          ],
        },
        appSumoInvoiceUUID: String,
        appSumoActionId: String,
      },
      planLimits: {
        channels: {
          total: Number,
          rtmp: Number,
          instagram: Number,
        },
        duration: {
          total: Number,
          live: Number,
          preRecorded: Number,
        },
        storage: {
          total: Number,
        },
        subAccounts: {
          total: Number,
        },
        branding: {
          logo: Boolean,
          caption: Boolean,
          cname: Boolean,
        },
      },
      limitsLeft: {
        channels: {
          total: Number,
          rtmp: Number,
          instagram: Number,
        },
        duration: {
          total: Number,
          live: Number,
          preRecorded: Number,
        },
        storage: {
          total: Number,
        },
        subAccounts: {
          total: Number,
        },
        branding: {
          logo: Boolean,
          caption: Boolean,
          cname: Boolean,
        },
      },
      subscriptionIdStripe: String,
      nextSubscription: {
        type: Schema.ObjectId,
      },
      subscsriptionCreatedAt: {
        type: Date,
        default: new Date(),
      },
      subscsriptionCreatedFrom: String,
      email: String,
      campaign: Object,
      expiredAt: Date,
    });

    userSubscriptionModel.setModel(
      db.connection.model("UserSubscription", userSubscriptionSchema)
    );

    return userSubscriptionSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    userSubscriptionModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return userSubscriptionModel.model;
  },

  /**
   * Create ADMIN user if it not exists
   */
};

export default userSubscriptionModel;
