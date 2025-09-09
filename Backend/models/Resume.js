const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  template: { type: String, required: true },
  data: { type: Object, required: true },
}, { timestamps: true });

// Use collection name from env
module.exports = mongoose.model("Resume", resumeSchema, process.env.COLLECTION_NAME);
