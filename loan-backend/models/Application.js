const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), unique: true },
  name: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  loanCategory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", ApplicationSchema);
