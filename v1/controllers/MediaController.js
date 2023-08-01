import MediaServices from "../services/MediaServices";

import ErrorManager from "../../utilities/ErrorManager";

const MediaController = {
  get: async (req, res) => {
    try {
      const result = await MediaServices.get(req.params.id);
      if (result) {
        res.json(result);
      } else {
        res.json({ msg: "No such media found." });
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  list: async (req, res) => {
    try {
      const result = await MediaServices.list(req.params.id);
      if (result.results.length > 0) {
        res.json(result);
      } else {
        res.json({ msg: "There are no media files." });
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default MediaController;
