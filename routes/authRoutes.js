const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Test route (for checking server & routes)
router.get("/test", (req, res) => {
  res.send(" Server is working and route is fine!");
});

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

module.exports = router;
