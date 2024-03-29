const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
