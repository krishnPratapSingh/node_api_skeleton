import express from "express";
const router = express.Router();

// Properties
import Properties from "../../properties";

const baseUrl = `${Properties.api}/test`;

router.get("/", function (req, res) {
	res.send({ status: "ok" });
});

export default router;
