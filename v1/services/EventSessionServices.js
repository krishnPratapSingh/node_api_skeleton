import EventSessionModel from "../models/EventSession/EventSessionModel";

const EventSessionServices = {
  async eventsCount(period, frequency, type) {
    var groupBy;
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
    return await EventSessionModel.eventsCount(
      period,
      frequency,
      type,
      groupBy
    );
  },

  async userEventStats(userId) {
    return await EventSessionModel.userEventStats(userId);
  },
};

export default EventSessionServices;
