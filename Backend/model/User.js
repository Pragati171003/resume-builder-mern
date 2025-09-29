import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile: { type: String, required: true },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
},{ 
  timestamps: true,
  collection: process.env.COLLECTION_NAME 
});
export default mongoose.models.User || mongoose.model("User", UserSchema);