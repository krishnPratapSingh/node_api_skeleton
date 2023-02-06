// Services
import LiveSessionServices from "../services/LiveSessionServices";

// Errors
import ErrorManager from "../classes/ErrorManager";

const ProductController = {
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
      let {
        page = 1,
        limit = 15,
        sort = "startDate",
        sortDirection = -1,
      } = req.params;
      const result = await LiveSessionServices.list(
        page,
        limit,
        sort,
        sortDirection
      );
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
};

export default ProductController;
