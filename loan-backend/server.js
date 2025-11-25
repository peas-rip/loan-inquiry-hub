require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const app = express();

connectDB(process.env.MONGO_URI);

// Basic security
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:8080","https://srisaifinance.netlify.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: "10kb" }));

// Rate limiter - simple example
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100
});
app.use(limiter);

// Routes
app.use("/api/applications", require("./routes/Application"));
app.use("/api/admin", require("./routes/Admin"));

app.get("/", (req, res) => res.send("Loan backend running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

