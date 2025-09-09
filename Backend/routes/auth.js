const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret";

// Register new user
router.post("/register", async (req,res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ message: "User already exists" });
    
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: "User registered" });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ token, username: user.username });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
