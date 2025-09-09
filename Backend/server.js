const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Connect to MongoDB with specific DB
mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log(`MongoDB connected to DB: ${process.env.DB_NAME}`))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
