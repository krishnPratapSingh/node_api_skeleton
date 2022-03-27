// Services
import UserServices from "../services/UserServices";

// Errors
import Errors from "../../classes/Errors";
import ErrorManager from "../../classes/ErrorManager";

const UserController = {

  // CRUD METHODS

   create: async (req, res) => {
    try {
      const result = await UserServices.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
   
  delete: async (req, res) => {
    try {
      const result = await UserServices.delete(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  get: async (req, res) => {
    try {
      const result = await UserServices.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  list: async (req, res) => {
    try {
      const result = await UserServices.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  update: async (req, res) => {
    try {
      const result = await UserServices.update(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  changePassword: async (req, res) => {
    try {
      const user = await UserServices.getByUsernameAndPassword(
        req.user.username,
        req.body.passwordAdmin
      );
      if (!user) {
        throw new Errors.PWD_ADMIN_NOT_VALID();
      }
      await UserServices.updatePassword(req.params.id, req.body.passwordNew);
      res.send({
        success: true
      });
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  }
};

export default UserController

