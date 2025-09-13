const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please fill this field"],
  },
  lastName: {
    type: String,
    required: [true, "Please fill this field"],
  },
  email: {
    type: String,
    required: [true, "Please fill this field"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please fill this field"],
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
