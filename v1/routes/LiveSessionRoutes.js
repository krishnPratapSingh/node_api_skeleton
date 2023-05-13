import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import LiveSessionController from "../controllers/LiveSessionController";

// Response validator
import validateResponse from "../../utilities/AjvResponseValidation";

const baseUrl = `/liveSession`;

router.post(
  baseUrl + "/:id",
  authenticate(),
  authorize([]),
  LiveSessionController.update
);

router.get(
  baseUrl + "/monthlyEventsCount",
  authenticate(),
  authorize([]),
  LiveSessionController.monthlyEventsCount,
  validateResponse
);

router.get(
  baseUrl + "/:id",
  authenticate(),
  authorize([]),
  LiveSessionController.get
);

router.delete(
  baseUrl + "/:id",
  authenticate(),
  authorize([]),
  LiveSessionController.delete
);

router.get(
  baseUrl + "",
  authenticate(),
  authorize([]),
  LiveSessionController.list
);

export default router;
