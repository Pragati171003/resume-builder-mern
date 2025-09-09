// routes/templateroutes.js

const express = require("express");
const { getTemplates, selectTemplate } = require("../controller/templatecontroller");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// List all templates (protected)
router.get("/", authMiddleware, getTemplates);

// Select a template (protected)
router.post("/select", authMiddleware, selectTemplate);

module.exports = router;
