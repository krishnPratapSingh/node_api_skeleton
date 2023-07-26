import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import UserController from "../controllers/UserController";

const baseUrl = `/user`;

router.get(
  baseUrl + "/find-user-by-oid/:userId",
  authenticate(),
  authorize([[`${Properties.user_read}`]]),
  UserController.findUser
);

router.get(
  baseUrl + "/find-user-by-email/:email",
  authenticate(),
  authorize([[`${Properties.user_read}`]]),
  UserController.findUserByEmail
);

router.get(
  baseUrl + "/find-user-by-ssoId/:ssoId",
  authenticate(),
  authorize([[`${Properties.user_read}`]]),
  UserController.findUserBySsoId
);

export default router;
