// models/UserModel.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Add other user details as needed
});

module.exports = mongoose.model("User", UserSchema);
