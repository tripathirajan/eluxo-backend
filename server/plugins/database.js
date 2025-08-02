const mongoose = require("mongoose");

let isConnected = false;

async function connectToMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in environment");

  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB via Mongoose");

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed due to SIGINT");
      process.exit(0);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

function getMongoose() {
  if (!isConnected) {
    throw new Error("Mongoose not connected. Call connectToMongo() first.");
  }
  return mongoose;
}

module.exports = {
  connectToMongo,
  getMongoose,
};
