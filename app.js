const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./database/connect");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect DB
connectDB();

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
