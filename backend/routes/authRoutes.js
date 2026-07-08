import express from "express";

const router = express.Router();

// Login API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  res.json({
    success: true,
    message: "Login Successful",
  });
});

export default router;