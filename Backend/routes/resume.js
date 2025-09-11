import express from "express";
import Resume from "../model/resume.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Save Resume
router.post("/", authMiddleware, async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.user.id, // comes from JWT
      ...req.body
    });
    await resume.save();
    res.status(201).json({ msg: "Resume saved successfully", resume });
  } catch (err) {
    res.status(500).json({ msg: "Error saving resume", error: err.message });
  }
});

export default router;
