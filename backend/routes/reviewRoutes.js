import express from "express";
import {
  reviewCode,
  reviewUploadedFile,
  getReviewHistory,
  deleteReview,
} from "../controllers/reviewController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Review pasted code
router.post("/", reviewCode);

// Review uploaded code file
router.post(
  "/upload",
  upload.single("codeFile"),
  reviewUploadedFile
);
// Get Review History
router.get("/history", getReviewHistory);

// Delete Review
router.delete("/:id", deleteReview);
export default router;