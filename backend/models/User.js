const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"], // ensures only valid roles
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
