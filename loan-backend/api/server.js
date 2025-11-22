require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("../config/db");

const app = express();

// Connect DB once (Vercel reuses connections)
connectDB(process.env.MONGO_URI);

// Security headers
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
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/applications", require("../routes/Application"));
app.use("/api/admin", require("../routes/Admin"));

app.get("/", (req, res) => res.send("Loan backend running"));

// ❗ The MOST important change:
// 👉 Export the Express app instead of listening to a port.
module.exports = app;
