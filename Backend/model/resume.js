import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  email: String,
  countryCode: String,
  mobile: String,
  linkedin: String,
  gitlab: String,
  education: {
    tenth: { college: String, year: String, marks: String },
    twelth: { college: String, year: String, marks: String },
    ug: { college: String, year: String, marks: String },
    pg: { college: String, year: String, marks: String }
  },
  skills: [String],
  experience: String,
  projects: [{ title: String, description: String }],
  achievements: String,
  certifications: String
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
