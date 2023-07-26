import EventSessionSchema from "./EventSessionSchema";

const queries = {
  async eventsCount(period, frequency, type, groupBy) {
    console.log("period[0] ==>>", period[0]);
    console.log("period[1] ==>>", period[1]);
    return await EventSessionSchema.getModel().aggregate([
      {
        $match: {
          "eventSnapShot.lastStartDate": {
            $gte: new Date(period[0]),
            // $lte: new Date(period[1]),
            $lt: new Date(new Date(period[1]).getTime() + 24 * 60 * 60 * 1000), // End date (next day)
          },
        },
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
        },
      },
    ]);
  },
};

export default {
  ...EventSessionSchema,
  ...queries,
};
