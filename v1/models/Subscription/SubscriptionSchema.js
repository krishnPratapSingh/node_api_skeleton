// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { mongo, Schema } from "mongoose";

// Logger
import Logger from "../../../utilities/Logger";

const subscriptionModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * User
     */
    const subscriptionSchema = new mongoose.Schema({
      RtmpCanGoLive: {
        type: "Number",
        required: true,
      },
      branding: {
        type: "String",
        required: true,
        enum: ["Custom", "Flutin"],
      },
      channelsCanGoLive: {
        type: "Number",
        required: true,
      },
      discountMonthlyInPercent: {
        type: "Number",
        required: true,
      },
      discountYearlyInPercent: {
        type: "Number",
        required: true,
      },
      inStreamRevenuePercentage: {
        type: "Number",
        required: true,
      },
      instagramCanGoLive: {
        type: "Boolean",
        required: true,
      },
      planDescription: {
        type: "Object",
        required: true,
      },
      planName: {
        type: "String",
        required: true,
      },
      planPricingAnnual: {
        type: "Number",
        required: true,
      },
      planPricingMonthly: {
        type: "Number",
        required: true,
      },
      streamDuration: {
        type: "Number",
        required: true,
      },
      streamingQualityUpTo: {
        type: "Number",
        required: true,
      },
      currency: {
        type: String,
      },
      stripe: Object,
      streamDurationInMinute: {
        type: "Number",
        required: true,
      },
      planLimits: {
        subAccounts: Number,
        duration: {
          total: Number,
          live: Number,
          preRecorded: Number,
        },
      },
      currency: { type: String },
      stripe: Object,
      streamDurationInMinute: {
        type: "Number",
        required: true,
      },
      coupons: {
        monthly: {
          type: Schema.ObjectId,
          ref: "Coupons",
        },
        yearly: {
          type: Schema.ObjectId,
          ref: "Coupons",
        },

        lifeTime: {
          type: Schema.ObjectId,
          ref: "Coupons",
        },
      },
      maxInstagramChannels: Number,
      storage: Number,
      enableCustomBranding: Boolean,
      enableCustomOverlay: Boolean,
      enableCustomBackgroundImage: Boolean,
      planListing: Object,
      showListing: Boolean,
      appSumoId: String,
      planPricingLifetime: Number,
      planPricingLifetimeDiscounted: Number,
      priority: Number,
      planLimits: {
        subAccounts: Number,
        duration: {
          live: Number,
          preRecorded: Number,
          total: Number,
        },
      },
      ltd: String,
    });

    subscriptionModel.setModel(
      db.connection.model("Subscription", subscriptionSchema)
    );

    return subscriptionSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    subscriptionModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return subscriptionModel.model;
  },

  /**
   * Create ADMIN user if it not exists
   */
};

export default subscriptionModel;
