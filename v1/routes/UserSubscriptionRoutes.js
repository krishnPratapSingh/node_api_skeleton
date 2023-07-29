import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import UserSubscriptionController from "../controllers/UserSubscriptionController";

const baseUrl = `/userSubscription`;

router.get(
  baseUrl + "/get/:userId",
  authenticate(),
  authorize([[`${Properties.userSubscription_read}`]]),
  UserSubscriptionController.findSubscription
);

export default router;
