import EventSessionModel from "../models/EventSession/EventSessionModel";
// Helper Methods
import { mapIntegersToMonthNames } from "../../utilities/Helpers";
// mongoose
import mongoose from "mongoose";

const EventSessionServices = {
  async eventsCount(period, frequency, type, userId, timeZone, testUser) {
    var groupBy;
    var periodStart;
    var periodEnd;
    var time;
    var groupByDaily;
    var groupByWeekly;
    var groupByMonthly;
    if (timeZone === "UTC") {
      // date range UTC
      time = {
        $gte: new Date(`${period[0]}T00:00:00.000Z`),
        $lte: new Date(`${period[1]}T23:59:59.999Z`),
      };
      // group by DAILY UTC
      groupByDaily = "$eventSnapShot.lastStartDate";
      // group by WEEKLY UTC
      groupByWeekly = {
        $dateFromParts: {
          isoWeekYear: { $isoWeekYear: "$eventSnapShot.lastStartDate" },
          isoWeek: { $isoWeek: "$eventSnapShot.lastStartDate" },
          isoDayOfWeek: 2, // 1 for Sunday (start of the week), 7 for Saturday (end of the week)
        },
      };
      // group by MONTHLY UTC
      groupByMonthly = "$eventSnapShot.lastStartDate";
    } else if (timeZone === "IST") {
      // date range IST
      periodStart = new Date(`${period[0]}T00:00:00.000Z`);
      periodStart.setHours(
        periodStart.getHours() + 5,
        periodStart.getMinutes() + 30
      );
      periodEnd = new Date(`${period[1]}T23:59:59.999Z`);
      periodEnd.setHours(periodEnd.getHours() + 5, periodEnd.getMinutes() + 30);
      time = { $gte: periodStart, $lte: periodEnd };
      // group by DAILY IST
      groupByDaily = {
        $add: ["$eventSnapShot.lastStartDate", 19800000], // 5 hours and 30 minutes in milliseconds
      };
      // group by WEEKLY IST
      groupByWeekly = {
        $dateFromParts: {
          isoWeekYear: {
            $isoWeekYear: {
              $add: ["$eventSnapShot.lastStartDate", 19800000],
            },
          },
          isoWeek: {
            $isoWeek: { $add: ["$eventSnapShot.lastStartDate", 19800000] },
          },
          isoDayOfWeek: 2,
        },
      };
      // group by MONTHLY IST
      groupByMonthly = { $add: ["$eventSnapShot.lastStartDate", 19800000] };
    }
    var match = {
      "eventSnapShot.lastStartDate": time,
    };
    if (userId) {
      match["eventSnapShot._artist"] = mongoose.Types.ObjectId(userId);
    } else {
      if (testUser.length > 0) {
        match["eventSnapShot._artist"] = {
          $nin: testUser,
        };
      }
    }
    if (frequency == "DAILY") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d",
          date: groupByDaily,
        },
      };
    }
    if (frequency == "WEEKLY") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d",
          date: groupByWeekly,
        },
      };
    }
    if (frequency == "MONTHLY") {
      groupBy = {
        $month: groupByMonthly,
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
