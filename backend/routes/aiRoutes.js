import express from "express";
import { aiReview } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", aiReview);

export default router;