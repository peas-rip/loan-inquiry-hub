const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },

  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  primaryContactNumber: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },

  loanCategory: { type: String, required: true },
  loanCategoryOther: { type: String, default: null },

  // TWO mandatory referrals
  referralName1: { type: String, required: true },
  referralPhone1: { type: String, required: true },
  referralName2: { type: String, required: true },
  referralPhone2: { type: String, required: true },

  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", ApplicationSchema);
