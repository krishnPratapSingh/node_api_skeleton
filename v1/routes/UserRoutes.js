import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authorize } from "../security/SecurityManager";

// Controller
import UserController from "../controllers/UserController";

const baseUrl = `/user`;
router.post(
  baseUrl + "/:id/changePassword",
  authorize(["ADMIN"]),
  UserController.changePassword
);
router.post(baseUrl + "", authorize([]), UserController.create);
router.delete(baseUrl + "/:id", authorize([]), UserController.delete);
router.get(baseUrl + "/:id", authorize([]), UserController.get);
router.get(baseUrl + "", authorize([]), UserController.list);
router.post(baseUrl + "/:id", authorize([]), UserController.update);
router.post(
  baseUrl + "/:id/changePassword",
  authorize(["ADMIN"]),
  UserController.changePassword
);

export default router;
