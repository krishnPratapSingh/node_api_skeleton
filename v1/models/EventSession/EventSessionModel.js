import EventSessionSchema from "./EventSessionSchema";
import mongoose from "mongoose";

const queries = {
  async eventsCount(match, period, frequency, type, groupBy) {
    // console.log("match ==>>", match);
    return await EventSessionSchema.getModel().aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: groupBy,
          unique: {
            $addToSet: "$eventSnapShot._id",
          },
          rtmp: {
            $sum: {
              $cond: [
                {
                  $eq: ["$eventSnapShot.isDefaultSourceRTMP", true],
                },
                1,
                0,
              ],
            },
          },
          nonRTMP: {
            $sum: {
              $cond: [
                {
                  $eq: ["$eventSnapShot.isDefaultSourceRTMP", false],
                },
                1,
                0,
              ],
            },
          },
          preRecorded: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$eventSnapShot.isDefaultSourceRTMP", false],
                    },
                    {
                      $eq: ["$eventSnapShot.eventType", "preRecorded"],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          live: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$eventSnapShot.isDefaultSourceRTMP", false],
                    },
                    {
                      $eq: ["$eventSnapShot.eventType", "live"],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          classicStudio: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$eventSnapShot.isDefaultSourceRTMP", false],
                    },
                    {
                      $eq: ["$eventSnapShot.eventType", "live"],
                    },
                    {
                      $eq: ["$eventSnapShot.studio", "classicStudio"],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          freeFlowStudio: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$eventSnapShot.isDefaultSourceRTMP", false],
                    },
                    {
                      $eq: ["$eventSnapShot.eventType", "live"],
                    },
                    {
                      $eq: ["$eventSnapShot.studio", "freeFlowStudio"],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $group: {
          _id: null,
          rtmp: {
            $push: "$rtmp",
          },
          nonRTMP: {
            $push: "$nonRTMP",
          },
          preRecorded: {
            $push: "$preRecorded",
          },
          live: {
            $push: "$live",
          },
          classicStudio: {
            $push: "$classicStudio",
          },
          freeFlowStudio: {
            $push: "$freeFlowStudio",
          },
          count: {
            $push: "$count",
          },
          unique: {
            $push: {
              $size: "$unique",
            },
          },
          dates: {
            $push: "$_id",
          },
          totalValue: {
            $sum: "$count",
          },
        },
      },
      {
        $project: {
          rtmp: 1,
          nonRTMP: 1,
          preRecorded: 1,
          live: 1,
          classicStudio: 1,
          freeFlowStudio: 1,
          count: 1,
          unique: 1,
          totalValue: 1,
          dates: 1,
          totalUniqueValue: {
            $sum: "$unique",
          },
          totalRtmp: {
            $sum: "$rtmp",
          },
          totalLive: {
            $sum: "$live",
          },
          totalPreRecorded: {
            $sum: "$preRecorded",
          },
        },
      },
    ]);
  },

  async userEventStats(userId) {
    return await EventSessionSchema.getModel().aggregate([
      {
        $match: {
          "eventSnapShot._artist": mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$eventSnapShot._artist",
          totalSessions: {
            $sum: 1,
          },
          unique: {
            $addToSet: "$eventSnapShot._id",
          },
          rtmpEvents: {
            $sum: {
              $cond: [
                {
                  $eq: ["$eventSnapShot.isDefaultSourceRTMP", true],
                },
                1,
                0,
              ],
            },
          },
          preRecordedEvents: {
            $sum: {
              $cond: [
                {
                  $eq: ["$eventSnapShot.eventType", "preRecorded"],
                },
                1,
                0,
              ],
            },
          },
          liveEvents: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ["$eventSnapShot.isDefaultSourceRTMP", false],
                    },
                    {
                      $eq: ["$eventSnapShot.eventType", "live"],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $addFields: {
          uniqueEventCount: {
            $size: "$unique",
          },
        },
      },
      {
        $project: {
          liveEvents: 1,
          preRecordedEvents: 1,
          totalEvents: 1,
          rtmpEvents: 1,
          uniqueEventCount: 1,
          totalSessions: 1,
        },
      },
    ]);
  },
};

export default {
  ...EventSessionSchema,
  ...queries,
};
