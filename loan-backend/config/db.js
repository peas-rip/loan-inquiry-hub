// 🆕 PREVENT MULTIPLE CONNECTIONS IN LAMBDA
const mongoose = require("mongoose");

let isConnected = false; // 🆕 Added global flag

async function connectDB(uri) {
  // 🆕 Lambda warm start → reuse existing DB connection
  if (isConnected) {
    console.log("MongoDB already connected (warm start)");
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1; // 🆕 Mark connected

    console.log("MongoDB connected (Lambda cold start)");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = connectDB;
