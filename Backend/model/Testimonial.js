import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  title: { type: String },
  quote: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);