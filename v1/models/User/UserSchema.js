// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { mongo, Schema } from "mongoose";

// Logger
import Logger from "../../../utilities/Logger";

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
      _artist: {
        type: Schema.ObjectId,
        ref: "stripelogsCustom",
      },
      channels: {
        type: "Object",
      },
      credits: {
        type: "Number",
      },
      description: {
        type: "String",
      },
      facebook: {
        type: "String",
      },
      genre: {
        type: "Object",
      },
      instagram: {
        type: "String",
      },
      name: {
        type: "String",
      },
      otherCat: {
        type: "Boolean",
        required: true,
      },
      password: {
        type: "String",
        required: true,
      },
      paymentAccountDetail: {
        type: "Object",
      },
      payoutDetails: {
        type: "Object",
      },
      profileImage: {
        type: "String",
      },
      roles: [
        {
          type: "String",
        },
      ],
      ssoId: {
        type: "String",
        required: true,
      },
      stripeConnectedAcc: {
        type: "String",
      },
      surname: {
        type: "String",
      },
      tag: {
        type: "Object",
      },
      twitter: {
        type: "String",
      },
      username: {
        type: "String",
        required: true,
      },
      youtube: {
        type: "String",
      },
      profileColor: {
        type: "String",
      },
      bannerImage: {
        type: String,
        required: false,
      },
      channels: [Object],
      genre: [Object],
      tag: [Object],
      payoutDetailsBank: [{}],
      payoutDetailsUpi: [
        {
          upi: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            required: true,
          },
        },
      ],
      payoutDetailsPaytmWallet: [
        {
          paytmWalletNumber: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            required: true,
          },
        },
      ],
      paypalDetails: {
        paypalEmail: { type: String },
        type: { type: String },
      },
      detailsByIp: Object,
      instagramChannel: {
        type: Boolean,
        default: false,
      },
      subDomain: {
        type: String,
        unique: true,
        // required: true,
      },
      testUser: {
        type: Boolean,
        default: false,
      },
      currency: {
        type: "String",
        enum: ["USD", "INR"],
        default: "USD",
      },
      createdAt: Date,
      updatedAt: Date,
      mailListID: Number,
      totalDuration: {
        type: Number,
        default: 0,
      },
      preRecordedTotalDuration: {
        type: Number,
        default: 0,
      },
      subscription: {
        subscriptionStartDate: Number,
        subscriptionEndDate: Number,
        package: {
          type: "String",
          enum: ["month", "year", "lifetime", ""],
        },
        canceled: {
          type: Boolean,
          default: false,
        },
        planId: String, // PlanID from APPSUMO
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
      stripeCustomerID: { type: "String" },
      earning: { totalEarning: Number, totalAvailableEarning: Number },
      cameraFlip: {
        type: Boolean,
        default: false,
      },
      accountType: {
        type: String,
        default: "mainAccount",
      },
      affiliateId: { type: String },
      backgroundImage: { type: Schema.ObjectId, ref: "BackgroundImage" },
      overlayImage: { type: Schema.ObjectId, ref: "OverlayImage" },
      logoImage: { type: Schema.ObjectId, ref: "LogoImage" },
      caption: { type: Schema.ObjectId, ref: "Caption" },
      brandingCustomizations: {
        eCommerceProduct: { type: Schema.ObjectId, ref: "EcommerceProduct" },
        ticker: { type: Schema.ObjectId, ref: "Ticker" },
      },
      canvasOptions: {
        showGuideLines: { type: Boolean, default: true },
      },
      _fans: [
        {
          type: Schema.ObjectId,
          ref: "UserFan",
        },
      ],
      _plan: {
        type: Schema.ObjectId,
        ref: "Subscription",
      },
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
