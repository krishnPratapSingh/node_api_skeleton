import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import ProductController from "../controllers/ProductController";

// Validator
import { validateCreateProduct } from "../middlewares/validators/Product/CreateProductMiddleware";
import { validateUpdateProduct } from "../middlewares/validators/Product/UpdateProductMiddleware";
import { validateProductId } from "../middlewares/validators/Product/validateProductIdMiddleware";

const baseUrl = `/product`;

router.post(
  baseUrl + "",
  authenticate(),
  authorize(["product_create", "product_read"]),
  validateCreateProduct,
  ProductController.create
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
