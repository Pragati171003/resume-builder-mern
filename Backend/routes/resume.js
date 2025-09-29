import express from "express";
import Resume from "../model/Resume.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.user.id, 
      ...req.body
    });
    await resume.save();
    res.status(201).json({ msg: "Resume saved successfully", resume });
  } catch (err) {
    res.status(500).json({ msg: "Error saving resume", error: err.message });
  }
});

export default router;
