// Database
import Database from "../../../utilities/Database_Crud_db";
import mongoose, { Schema } from "mongoose";

const liveSessionModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * Product
     */
    const liveSessionSchema = new mongoose.Schema({
      ads: {
        type: "Object",
      },
      channels: {
        type: "Object",
      },
      contentInviteMail: {
        type: "String",
      },
      contentRegistrationMail: {
        type: "String",
      },
      contentThankyouMail: {
        type: "String",
      },
      description: {
        type: "String",
      },
      duration: {
        type: "Number",
      },
      eventImg: {
        type: "String",
      },
      fbLink: {
        type: "String",
      },
      genre: {
        type: "String",
      },
      participants: {
        type: "Object",
      },
      published: {
        type: "Boolean",
      },
      songList: {
        type: "Object",
      },
      startDate: {
        type: "Date",
        required: true,
      },
      stream: {
        type: "Object",
      },
      tag: {
        type: "Object",
      },
      title: {
        type: "String",
        required: true,
      },
      tracks: {
        type: "Object",
      },
      ytLink: {
        type: "String",
      },
      reminderSent: Boolean,
      stream: Object,
      channels: [Object],
      // genre: [Object],
      tag: [Object],
      communications: Object,
      endSent: Boolean,
      inviteSent: Boolean,
      isDefaultSourceRTMP: {
        type: Boolean,
        default: false,
      },
      liveFrom: {
        type: String,
        enum: ["flutinStudio", "OBS"],
        default: "flutinStudio",
      },
      studio: {
        type: String,
        enum: ["classicStudio", "freeFlowStudio", "", null],
        default: "",
      },
      isMeetingEnabled: {
        type: Boolean,
        default: false,
      },
      otherCat: Boolean,
      goLive: Boolean,
      lastStartDate: Date,
      lastEndDate: Date,
      cancelled: {
        type: Boolean,
        default: false,
      },
      featured: {
        type: Boolean,
        default: false,
      },
      monetization: Object,
      eventEndDate: Date,
      live: {
        type: Boolean,
        default: false,
      },
      feedbackRating: Number,
      feedbackComment: Object,
      isDeleted: {
        type: Boolean,
        default: false,
      },
      createdAt: Date,
      updatedAt: Date,
      campaignID: Number,
      eventType: {
        type: String,
        enum: ["live", "preRecorded"],
        default: "live",
      },
      captionLogo: {
        type: String,
        default: "default",
      },
      captionText: {
        type: String,
        default: "false",
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
      updatedAt: {
        type: Date,
        default: new Date(),
      },
      deletedAt: {
        type: Date,
      },
      contactListID: Number,
      commissionPercentage: Number,
      eventDuration: {
        type: Number,
        default: 0,
      },
      wowzaServer: Object,
      rtmpKey: String,
      meetingToken: String,
      publishToSocialMedia: {
        type: Boolean,
        default: false,
      },
      recordedMedia: {
        totalRecordedVideos: {
          type: Number,
          default: 0,
        },
        isRecordingEnabled: {
          type: Boolean,
          default: false,
        },
      },
      logoImage: { type: Schema.ObjectId, ref: "LogoImage" },
      overlayImage: { type: Schema.ObjectId, ref: "OverlayImage" },
      backgroundImage: { type: Schema.ObjectId, ref: "BackgroundImage" },
      caption: { type: Schema.ObjectId, ref: "Caption" },
      brandingCustomizations: {
        eCommerceProduct: { type: Schema.ObjectId, ref: "EcommerceProduct" },
        ticker: { type: Schema.ObjectId, ref: "Ticker" },
        featuredComment: { type: Schema.ObjectId, ref: "Chat" },
      },
      expiringEvent: { expire: { type: Boolean, default: true } },
      meeting: {
        startDate: {
          type: Date,
        },
        meetingToken: String,
        studio: {
          type: String,
          default: "classicStudio",
        },
        isMeetingEnabled: {
          type: Boolean,
          default: false,
        },
      },
      // RELATIONS
      _artist: {
        type: Schema.ObjectId,
        ref: "User",
      },
      _listId: {
        type: Schema.ObjectId,
        ref: "SongList",
      },
      _liveSessionCustomization: {
        type: Schema.ObjectId,
        ref: "liveSessionCustomization",
      },
      _participants: [
        {
          //type: Schema.ObjectId,
          //ref: "UserFan",
          type: "String",
        },
      ],
    });

    liveSessionModel.setModel(
      db.connection.model("LiveSession", liveSessionSchema)
    );

    return liveSessionSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    liveSessionModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return liveSessionModel.model;
  },
};

export default liveSessionModel;
