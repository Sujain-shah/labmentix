import pool from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

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

const PORT = process.env.PORT || 5000;
pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed:", error.message));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});