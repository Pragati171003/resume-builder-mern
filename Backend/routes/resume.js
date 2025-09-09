const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware");

// Get resume for logged-in user
router.get("/", authMiddleware, async (req,res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    if(!resume) return res.json({}); // no resume yet
    res.json(resume);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Save or update resume
router.post("/", authMiddleware, async (req,res) => {
  try {
    const { template, data } = req.body;

    let resume = await Resume.findOne({ userId: req.user.id });
    if(resume) {
      resume.template = template;
      resume.data = data;
      await resume.save();
      return res.json({ message: "Resume updated" });
    }

    resume = new Resume({ userId: req.user.id, template, data });
    await resume.save();
    res.json({ message: "Resume saved" });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
