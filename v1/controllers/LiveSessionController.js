// Services
import LiveSessionServices from "../services/LiveSessionServices";
import EventSessionServices from "../services/EventSessionServices";

// Errors
import ErrorManager from "../../utilities/ErrorManager";

// Response validation schema
import schema from "../middlewares/validators/LiveSession/responseSchema";

// Helper Methods
import { mapIntegersToMonthNames } from "../../utilities/Helpers";

const LiveSessionController = {
  // CRUD METHODS

  create: async (req, res) => {
    try {
      const result = await LiveSessionServices.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  delete: async (req, res) => {
    try {
      const result = await LiveSessionServices.delete(req.params.id);
      if (result) {
        res.json(result);
      } else {
        res.json({ msg: "No such product exists." });
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  get: async (req, res) => {
    try {
      const result = await LiveSessionServices.get(req.params.id);
      if (result) {
        res.json(result);
      } else {
        res.json({ msg: "No such product found." });
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  list: async (req, res) => {
    try {
      const result = await LiveSessionServices.list(req.query);
      if (result.results.length > 0) {
        res.json(result);
      } else {
        res.json({ msg: "There are no events." });
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  update: async (req, res) => {
    try {
      const result = await LiveSessionServices.update(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  eventsCount: async (req, res, next) => {
    try {
      const frequency = req.params.frequency;
      const date = req.params.date;
      const type = req.params.type;

      // splitting dates into startDate and endDate
      const period = date.split(",");

      // fetching results from DB
      const result = await EventSessionServices.eventsCount(
        period,
        frequency,
        type
      );

      console.log("result in eventsCount ==>>", result);

      // replacing month number from month names
      if (frequency == "MONTHLY") {
        const monthNames = mapIntegersToMonthNames(result[0].dates);
        console.log("monthNames ==>>", monthNames);
        if (monthNames) {
          result[0].dates = monthNames;
        }
      }

      const responseData = { success: true, data: result };
      res.send(responseData);
    } catch (err) {
      console.log("Error: in eventsCount controller:", err);
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default LiveSessionController;
