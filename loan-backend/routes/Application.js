const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const auth = require("../middleware/auth");
const { streamApplicationPDF } = require("../utils/pdf");

// Create application (public)
router.post("/", async (req, res) => {
  try {
    const { 
      name, 
      phoneNumber, 
      primaryContactNumber,
      address, 
      dateOfBirth, 
      gender, 
      loanCategory,
      loanCategoryOther,
      referralName,
      referralPhone
    } = req.body;

    // REQUIRED FIELDS CHECK
    const requiredFields = {
      name: "Name",
      phoneNumber: "Phone Number",
      primaryContactNumber: "Primary Contact Number",
      address: "Address",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      loanCategory: "Loan Category",
    };

    for (const key in requiredFields) {
      if (!req.body[key] || req.body[key].toString().trim() === "") {
        return res.status(400).json({
          message: `${requiredFields[key]} is required`,
          field: key
        });
      }
    }

    // If loanCategory = "other" and user didn’t provide text
    if (loanCategory === "other" && !loanCategoryOther) {
      return res.status(400).json({
        message: "Please specify your loan category",
        field: "loanCategoryOther"
      });
    }

    // Create new record
    const application = new Application({
      name,
      phoneNumber,
      primaryContactNumber,
      address,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      loanCategory,
      loanCategoryOther: loanCategory === "other" ? loanCategoryOther : null,
      referralName: referralName || null,
      referralPhone: referralPhone || null,
      submittedAt: new Date()
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted",
      applicationId: application.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Admin: get all applications (protected)
router.get("/", auth, async (req, res) => {
  try {
    const apps = await Application.find().sort({ submittedAt: -1 }).lean();
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: get one application
router.get("/:id", auth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).lean();
    if (!app) return res.status(404).json({ message: "Not found" });
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: download PDF for application
router.get("/:id/pdf", auth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).lean();
    if (!app) return res.status(404).json({ message: "Not found" });
    streamApplicationPDF(app, res);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Optionally, you can use req.admin to log who deleted
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    await application.deleteOne();

    res.json({
      message: `Application ${id} deleted successfully by admin ${req.admin.username}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
