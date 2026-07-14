import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Backend 🚀",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Review Routes
app.use("/api/review", reviewRoutes);
app.use("/api/ai", aiRoutes);

// Database Connection
pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((error) =>
    console.error("Database connection failed:", error.message)
  );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Get Profile
export const getProfile = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: user.rows[0],
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};