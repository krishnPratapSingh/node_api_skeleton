import EventSessionSchema from "./EventSessionSchema";

const queries = {
  async eventsCount() {
    return await EventSessionSchema.getModel().aggregate([
      {
        $match: {
          "eventSnapShot.lastStartDate": {
            $gte: new Date("Thu, 01 Jun 2023 00:00:00 GMT"),
            $lte: new Date("Fri, 30 Jun 2023 00:00:00 GMT"),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$eventSnapShot.lastStartDate",
            },
          },
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
        },
      },
    ]);
  },
};

export default {
  ...EventSessionSchema,
  ...queries,
};
