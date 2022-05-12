import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: false,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  organization: {
    type: String,
    minlength: 6,
    required: false,
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  inductionTraning: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.user || mongoose.model("user", UserSchema);
