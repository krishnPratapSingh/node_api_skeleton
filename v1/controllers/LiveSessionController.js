// Services
import LiveSessionServices from "../services/LiveSessionServices";

// Errors
import ErrorManager from "../../utilities/ErrorManager";

// Response validation schema
import schema from "../middlewares/validators/LiveSession/responseSchema";

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

  monthlyEventsCount: async (req, res, next) => {
    try {
      const result = await LiveSessionServices.monthlyEventsCount();
      if (result) {
        const responseData = { success: true, data: result };
        res.data = responseData;
        res.schema = schema.monthlyEventsCount;
      }
      next();
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default LiveSessionController;
