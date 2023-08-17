// Services
import LiveSessionServices from "../services/LiveSessionServices";
import EventSessionServices from "../services/EventSessionServices";
import UserServices from "../services/UserServices";

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

  liveSessionsByUser: async (req, res) => {
    try {
      const { currentPage = 1, pageSize = 20 } = req.params;
      const result = await LiveSessionServices.listByUserArtsit(
        {
          _artist: req.params.userId,
        },
        currentPage,
        pageSize
      );
      if (result) {
        const data = { success: true, data: result };
        res.json(data);
      } else {
        res.json({ msg: "No LiveSession found." });
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
      const timeZone = req.params.timeZone;
      console.log("timeZone==>>", timeZone);
      var userId;
      if (req.params.userId) {
        userId = req.params.userId;
      }

      // find test users
      var testUser = [];
      testUser = await UserServices.findTestUser();
      // console.log("testUser==>>", testUser);
      // splitting dates into startDate and endDate
      const period = date.split(",");

      // fetching results from DB
      const result = await EventSessionServices.eventsCount(
        period,
        frequency,
        type,
        userId,
        timeZone,
        testUser
      );

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
