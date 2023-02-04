import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Controller
import ContainerJobController from "../controllers/ContainerJobController";

const baseUrl = `${Properties.api}/containerJobs`;
router.post(
  baseUrl + "/create/containers/inDb",
  ContainerJobController.createContainersInDb
);

router.post(baseUrl + "/create/jobs", ContainerJobController.createJobs);
router.post(baseUrl + "/sync/bucket/jobs", ContainerJobController.syncBucket);
router.post(baseUrl + "/make/object/public", ContainerJobController.makePublic);

export default router;
