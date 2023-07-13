// Properties
import Properties from "../../properties";

// Security
import jsonwebtoken from "jsonwebtoken";

// Sevices
import UserServices from "../services/UserServices";

// Errors
import ErrorManager from "../../utilities/ErrorManager";
import Errors from "../../utilities/Errors";

// Response validation schema
import {
  login as loginResonseSchema,
  verifyToken as verifyTokenResponse,
  error,
} from "../middlewares/validators/Security/responseSchema";

const securityControllers = {
  /**
   * Login function
   *
   */
  login: async (req, res, next) => {
    try {
      // Get parameters from post request
      let params = req.body;
      // Retrieve user
      let user = await UserServices.getByUsernameAndPassword(
        params.email,
        params.password
      );
      if (user) {
        // Create token
        var token = jsonwebtoken.sign(user, Properties.tokenSecret, {
          expiresIn: 10800, //3 hours
        });
        user.api_token = token;
        user.password = undefined;

        // schema for response validation
        res.schema = loginResonseSchema;
        res.data = user;
        next();
      } else {
        // Error login
        throw new Errors.INVALID_LOGIN();
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
   * Verify JWT Token function
   *
   */
  verifyToken: async (req, res, next) => {
    try {
      let token = req.body.api_token;
      console.log("token ==>>", token);
      if (token) {
        let decoded = null;
        try {
          decoded = jsonwebtoken.verify(token, Properties.tokenSecret);
          console.log("decoded ==>>", decoded);
        } catch (err) {
          res.data = {
            httpStatusCode: 401,
            errorMessage: "Failed to authenticate",
          };
          res.schema = error;
          res.status(401);
          next();
        }
        console.log("deocded ==>>", decoded);
        console.log("deocded ==>>", decoded.email);
        const username = decoded.username;
        let user = await UserServices.getByUsername(username);
        console.log("user ==>>", user);
        user.api_token = token;
        res.schema = verifyTokenResponse;
        res.data = user;
        next();
        // res.json(user);
      } else {
        throw new Errors.NO_TOKEN();
      }
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(401).json(safeErr);
    }
  },

  /**
   * Change password for current user
   *
   */
  changePassword: async (req, res) => {
    try {
      // Retrieve user
      let user = await UserServices.getByUsernameAndPassword(
        req.user.username,
        req.body.passwordOld
      );
      if (!user) {
        throw new Errors.OLD_PWD_NOT_VALID();
      }

      await UserServices.updatePassword(req.user._id, req.body.passwordNew);
      res.json({
        success: true,
      });
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(400).json(safeErr);
    }
  },
};

export default securityControllers;
