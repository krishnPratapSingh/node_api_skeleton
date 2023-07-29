// Dependencies
import jsonwebtoken from "jsonwebtoken";
import cors from "cors";
import helmet from "helmet";
// Properties
import properties from "../../properties";
// Errors
import ErrorMessages from "../../utilities/ErrorMessages";
// model
import PermissionModel from "../models/Permission/PermissionModel";

// Middleware JWT
export const authenticate = () => {
  // console.log("inside authenticate");

  return [
    // Authenticate JWT token and attach user to request object (req.user)
    async (req, res, next) => {
      try {
        let token =
          req.headers.authorization &&
          req.headers.authorization.replace("Bearer ", "");

        if (!token) {
          throw Error(JSON.stringify(ErrorMessages.INVALID_AUTH_HEADER));
        } else {
          let decodedUser = null;
          try {
            decodedUser = jsonwebtoken.verify(token, properties.tokenSecret);
          } catch (err) {
            throw Error(JSON.stringify(ErrorMessages.JWT_INVALID));
          }

          if (decodedUser) {
            req.user = decodedUser;
            next();
          } else {
            throw Error(JSON.stringify(ErrorMessages.UNAUTHORIZED));
          }
        }
      } catch (err) {
        console.log("error in authenticate ==>>", err);
        // res.send(JSON.parse(err.message));
        res.status(401).json("Invalid Token");
      }
    },
  ];
};

export const initSecurity = (app) => {
  app.use(helmet());
  app.use(cors());
};

// ---------------- UTILS FUNCTIONS ---------------- //

export const authorize = (permissions) => {
  if (typeof permissions === "string") {
    permissions = [permissions];
  }
  // console.log("inside authorize", permissions);

  return async (req, res, next) => {
    try {
      let allowed = false;
      // console.log("inside has permission");
      const permissionsAllocated = await PermissionModel.getPermissionByUserId(
        req.user._id
      );
      // console.log("permissionsAllocated==>>", permissionsAllocated);
      // console.log("permissions==>>", permissions);
      const permissionRequired = permissions;
      const hasPermission = permissionRequired.filter(
        (prop) => !permissionsAllocated[prop]
      );
      if (hasPermission.length == 0) {
        console.log("has permission");

        next();
      } else {
        throw Error(JSON.stringify(ErrorMessages.FORBIDDEN));
      }
    } catch (err) {
      console.log("error in hasPermission ==>", err);
      res.send(JSON.parse(err.message));
    }
  };
};
