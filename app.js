const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./database/connect");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS middleware properly configure
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://full-stack-frontend-mu.vercel.app"], // frontend origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // cookies / auth tokens allow
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect DB
connectDB();

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
