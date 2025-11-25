const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing credentials" });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: admin._id, username: admin.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });

    res.json({ token, username: admin.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/admin/update
// Requires Authorization: Bearer <token>
router.patch("/update",async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, gender, loanCategory, fromDate, toDate } = req.query;

    let query = {};

    // 🔍 Global Search (name, phone, address, referral)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
        { primaryContactNumber: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { referralName: { $regex: search, $options: "i" } }
      ];
    }

    // ⚧ Filter by Gender
    if (gender && gender !== "all") {
      query.gender = gender;
    }

    // 🏦 Filter by Loan Category
    if (loanCategory && loanCategory !== "all") {
      query.loanCategory = loanCategory;
    }

    // 📅 Filter by Date Range
    if (fromDate || toDate) {
      query.submittedAt = {};

      if (fromDate) {
        query.submittedAt.$gte = new Date(fromDate);
      }
      if (toDate) {
        query.submittedAt.$lte = new Date(toDate);
      }
    }

    const applications = await Application.find(query).sort({ submittedAt: -1 });

    res.json({
      count: applications.length,
      applications,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
