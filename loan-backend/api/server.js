const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// FIX: Full CORS handling
app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://admin-rs1h.onrender.com",
    "https://saifinancefrontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// REQUIRED: API Gateway preflight fix
app.options("*", cors());

app.get("/test", (req, res) => {
  res.json({ success: true, message: "Express working on Lambda!" });
});

// your routes...
require("./routes/Admin")(app);
require("./routes/Application")(app);

module.exports = app;
