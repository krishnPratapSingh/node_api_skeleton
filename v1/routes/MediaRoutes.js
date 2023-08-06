import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Security
import { authenticate, authorize } from "../security/SecurityManager";

// Controller
import MediaController from "../controllers/MediaController";

const baseUrl = `/media`;

router.get(
  baseUrl + "/:id",
  authenticate(),
  authorize([`${Properties.media_read}`]),
  MediaController.get
);

router.get(
  baseUrl + "/list/:userId/:pageNumber",
  authenticate(),
  authorize([`${Properties.media_read}`]),
  MediaController.list
);

export default router;
