const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, // <-- added
  name: String,
  phoneNumber: String,
  primaryContactNumber: String,
  address: String,
  dateOfBirth: Date,
  gender: String,
  loanCategory: String,
  loanCategoryOther: { type: String, default: null },
  referralName: { type: String, default: null },
  referralPhone: { type: String, default: null },
  submittedAt: Date
});


module.exports = mongoose.model("Application", ApplicationSchema);
