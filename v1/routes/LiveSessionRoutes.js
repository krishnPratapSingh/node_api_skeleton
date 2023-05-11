import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import LiveSessionController from "../controllers/LiveSessionController";

// Validator
import monthlyEventsCount from "../middlewares/validators/LiveSession/requestValidation";

const baseUrl = `${Properties.api}/liveSession`;

router.get(
  baseUrl + "/monthlyEventsCount",
  authenticate(),
  authorize([]),
  monthlyEventsCount,
  LiveSessionController.monthlyEventsCount
);
router.delete(
  baseUrl + "/:id",
  authorize([]),
  validateProductId,
  ProductController.delete
);
router.get(
  baseUrl + "/:id",
  authorize([]),
  validateProductId,
  ProductController.get
);
router.get(baseUrl + "", authorize([]), ProductController.list);
router.post(
  baseUrl + "/:id",
  authorize([]),
  validateUpdateProduct,
  ProductController.update
);

export default router;
