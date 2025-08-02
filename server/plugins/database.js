const mongoose = require('mongoose');
const logger = require('../../services/logger');

let isConnected = false;

async function connectToMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI in environment');

  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    logger.log('✅ Connected to MongoDB via Mongoose');

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.log('🔌 MongoDB connection closed due to SIGINT');
      /* eslint-disable no-process-exit */
      process.exit(0);
    });
  } catch (err) {
    logger.error('❌ MongoDB connection error:', err);
    /* eslint-disable no-process-exit */
    process.exit(1);
  }
}

function getMongoose() {
  if (!isConnected) {
    throw new Error('Mongoose not connected. Call connectToMongo() first.');
  }
  return mongoose;
}

module.exports = {
  connectToMongo,
  getMongoose,
};
