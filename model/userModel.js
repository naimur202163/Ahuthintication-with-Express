const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is not Provided"],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database"],
    lowercase: true,
    trim: true,
    required: [true, "Email is not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },

  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "Please specify user role"],
  },
  password: {
    type: String,
    required: true,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
