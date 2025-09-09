const express = require("express");
const { getTemplates } = require("../controller/templatecontroller");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTemplates);

module.exports = router;
