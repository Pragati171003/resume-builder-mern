import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import faqRoutes from './routes/faqRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  'https://resumebuilder-chi-rouge.vercel.app' 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
