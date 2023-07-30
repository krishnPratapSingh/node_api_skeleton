// Services
import UserServices from "../services/UserServices";
import EventSessionServices from "../services/EventSessionServices";

// Errors
import Errors from "../../utilities/Errors";
import ErrorManager from "../../utilities/ErrorManager";

const UserController = {
  // CRUD METHODS

  findUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("userId==>>", userId);
      const user = await UserServices.findUser({ _id: userId });
      const responseData = { success: true, data: user };
      res.json(responseData);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  findUserByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      const ssoId = await UserServices.findUserByEmail(email);
      var user;

      if (ssoId) user = await UserServices.findUser({ ssoId: ssoId });
      else throw new Error();
      if (user && user._id) {
        const responseData = { success: true, data: user };
        res.json(responseData);
      } else {
        throw new Error();
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  findUserBySsoId: async (req, res) => {
    try {
      const ssoId = req.params.ssoId;
      const user = await UserServices.findUser({ ssoId: ssoId });
      const responseData = { success: true, data: user };
      res.json(responseData);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  userEventStats: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await EventSessionServices.userEventStats(userId);
      const responseData = { success: true, data: user };
      res.json(responseData);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  getemailFromSsoId: async (req, res) => {
    try {
      const ssoId = req.params.ssoId;
      const email = await UserServices.getUserMailBySsoId(ssoId);
      const responseData = { success: true, data: email };
      res.json(responseData);
    } catch (err) {
      console.log("error in getUserEmailFromSSO ==>>", err);
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

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
        success: true,
      });
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default UserController;
