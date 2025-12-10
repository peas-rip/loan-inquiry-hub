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

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS
app.use(cors({
    origin: "https://saifinancefrontend.onrender.com",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    credentials: true
}));

app.use(express.json({ limit: "10kb" }));

// Rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  })
);

// Routes
app.use("/admin", require("../routes/Admin"));
app.use("/applications", require("../routes/Application"));


app.get("/", (req, res) => res.send("Loan backend running"));

module.exports = app;
