import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import LiveSessionController from "../controllers/LiveSessionController";

// Validator
import { validateCreateProduct } from "../middlewares/validators/Product/CreateProductMiddleware";
import { validateUpdateProduct } from "../middlewares/validators/Product/UpdateProductMiddleware";
import { validateProductId } from "../middlewares/validators/Product/validateProductIdMiddleware";

const baseUrl = `${Properties.api}/product`;

router.get(
  baseUrl + "/:id",
  authorize([]),
  validateProductId,
  LiveSessionController.get
);

router.get(baseUrl + "", authorize([]), LiveSessionController.list);

export default router;
