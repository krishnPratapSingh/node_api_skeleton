import EventSessionModel from "../models/EventSession/EventSessionModel";
// Helper Methods
import { mapIntegersToMonthNames } from "../../utilities/Helpers";
// mongoose
import mongoose from "mongoose";

const EventSessionServices = {
  async eventsCount(period, frequency, type, userId) {
    var groupBy;
    var match = {
      "eventSnapShot.lastStartDate": {
        $gte: new Date(period[0]),
        $lt: new Date(new Date(period[1]).getTime() + 24 * 60 * 60 * 1000), // End date (next day)
      },
    };
    if (userId) {
      match["eventSnapShot._artist"] = mongoose.Types.ObjectId(userId);
    }
    if (frequency == "DAILY") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$eventSnapShot.lastStartDate",
        },
      };
    }
    if (frequency == "WEEKLY") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d",
          date: {
            $dateFromParts: {
              isoWeekYear: { $isoWeekYear: "$eventSnapShot.lastStartDate" },
              isoWeek: { $isoWeek: "$eventSnapShot.lastStartDate" },
              isoDayOfWeek: 1, // 1 for Sunday (start of the week), 7 for Saturday (end of the week)
            },
          },
        },
      };
    }
    if (frequency == "MONTHLY") {
      groupBy = {
        $month: "$eventSnapShot.lastStartDate",
      };
    }
    const result = await EventSessionModel.eventsCount(
      match,
      period,
      frequency,
      type,
      groupBy
    );

    // replacing month number from month names
    if (frequency == "MONTHLY") {
      const monthNames = mapIntegersToMonthNames(result[0].dates);
      console.log("monthNames ==>>", monthNames);
      if (monthNames) {
        result[0].dates = monthNames;
      }
    }

    return result;
  },

  async userEventStats(userId) {
    return await EventSessionModel.userEventStats(userId);
  },
};

export default EventSessionServices;
