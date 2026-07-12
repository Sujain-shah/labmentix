import express from "express";
import { reviewCode } from "../controllers/reviewController.js";

const router = express.Router();

// Review API
router.post("/", reviewCode);

export default router;