import express from "express";
import {
  signup,
  login,
} from "../controllers/authController.js";

const router = express.Router();

// Signup API
router.post("/signup", signup);

// Login API
router.post("/login", login);

export default router;