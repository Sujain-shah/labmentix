import fs from "fs";
import pool from "../config/db.js";

// Common Static Analysis Function
const analyzeCode = (code) => {
  let suggestions = [];

  if (code.includes("var ")) {
    suggestions.push("Avoid using 'var'. Use 'let' or 'const' instead.");
  }

  if (code.includes("console.log")) {
    suggestions.push("Remove console.log statements before production.");
  }

  if (code.length < 20) {
    suggestions.push("Code is too short for meaningful analysis.");
  }

  if (suggestions.length === 0) {
    suggestions.push("No obvious issues found. Great job!");
  }
  const metrics = {
    linesOfCode: code.split("\n").length,
    functions:
      (code.match(/function\s+\w+/g) || []).length +
      (code.match(/=>/g) || []).length,
    classes: (code.match(/class\s+\w+/g) || []).length,
  };
  return {
    suggestions,
    metrics,
  };
};

// Review pasted code
export const reviewCode = async (req, res) => {
  try {
    const { language, code, email } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required",
      });
    }

    const analysis = analyzeCode(code);
    await pool.query(
      `INSERT INTO reviews (language, code, suggestions, email)
   VALUES ($1, $2, $3, $4)`,
      [
        language,
        code,
        JSON.stringify(analysis.suggestions),
        email,
      ]
    );

    return res.json({
      success: true,
      language,
      suggestions: analysis.suggestions,
      metrics: analysis.metrics,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Review uploaded file
export const reviewUploadedFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const code = fs.readFileSync(req.file.path, "utf8");

    const analysis = analyzeCode(code);

    // Delete uploaded file after reading
    fs.unlinkSync(req.file.path);

    return res.json({
      success: true,
      file: req.file.originalname,
      suggestions: analysis.suggestions,
      metrics: analysis.metrics,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "File review failed",
    });
  }
};
export const getReviewHistory = async (req, res) => {
  try {
    const { email } = req.query;

    const reviews = await pool.query(
      "SELECT * FROM reviews WHERE email = $1 ORDER BY created_at DESC",
      [email]
    );

    return res.json({
      success: true,
      reviews: reviews.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch review history",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    await pool.query(
      "DELETE FROM reviews WHERE id = $1 AND email = $2",
      [id, email]
    );

    return res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};