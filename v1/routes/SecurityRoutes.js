import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authorize } from "../security/SecurityManager";

// Controller
import SecurityController from "../controllers/SecurityController";

// Response validator
import validateResponse from "../../utilities/AjvResponseValidation";

const baseUrl = ``;
router.post(baseUrl + "/login", SecurityController.login, validateResponse);
router.post(
  baseUrl + "/verifyToken",
  SecurityController.verifyToken,
  validateResponse
);
router.post(
  baseUrl + "/changePassword",
  authorize(),
  SecurityController.changePassword
);

export default router;
