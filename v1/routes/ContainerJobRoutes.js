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

export default router;
