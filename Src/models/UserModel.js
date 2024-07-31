import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false, // Marked as optional
  },
  image: {
    type: String,
    required: false, // Marked as optional
  },
});

export default mongoose.model("User", UserSchema);
