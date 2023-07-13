// Services
import LiveSessionServices from "../services/LiveSessionServices";
import EventSessionServices from "../services/EventSessionServices";

// Errors
import ErrorManager from "../../utilities/ErrorManager";

// Response validation schema
import schema from "../middlewares/validators/LiveSession/responseSchema";

// Helper Methods
import { generateDatesInRange } from "../../utilities/Helpers";

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
      console.log("result in list controller: ", result);
      if (result.results.length > 0) {
        res.json(result);
      } else {
        res.json({ msg: "There are no products." });
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
      // const frequency = req.body.frequency
      // const period = req.body.period

      const result = await EventSessionServices.eventsCount();

      const responseData = { success: true, data: result };

      const dates = generateDatesInRange("2023-06-01", "2023-06-30");

      responseData.data[0].dates = dates;
      res.data = responseData;
      res.send(responseData);
      // res.schema = schema.monthlyEventsCount;

      // next();
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default LiveSessionController;
