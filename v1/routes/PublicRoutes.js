import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

// Controller
import UserController from "../controllers/UserController";

const baseUrl = ``;

router.get(baseUrl, function (req, res) {
  res.send({ status: "ok" });
});

export default router;
