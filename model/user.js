const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/EjsTask");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone: {
    type: Number,
    required: true,
  },
  profileImage:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model("User", userSchema);
