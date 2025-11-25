require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("../config/db");

const app = express();

// Connect DB only once
connectDB();

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://srisaifinance.netlify.app",
      "https://saifinancefrontend.onrender.com"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

// Rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  })
);

// Routes
app.use("/api/admin", require("../routes/Admin"));
app.use("/api/applications", require("../routes/Application"));

app.get("/", (req, res) => res.send("Loan backend running"));

module.exports = app;
