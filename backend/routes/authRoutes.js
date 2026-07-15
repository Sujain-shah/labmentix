import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

// Signup API
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Login API
router.post("/login", login);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;