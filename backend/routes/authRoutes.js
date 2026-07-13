import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Signup API
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Login API
router.post("/login", login);

export default router;