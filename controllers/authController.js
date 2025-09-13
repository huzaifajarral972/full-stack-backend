const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Register
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Pehle check karo user exist to nahi
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ msg: "User already exists, please try another email" });
    }

    // Password ko hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // User create karo
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check karo user exist karta hai ya nahi
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Password match karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // JWT token generate karo
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretKey123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = { register, login };
