import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME || 'servixo',
      serverSelectionTimeoutMS: 30000,
      tlsInsecure: true
    });
    // eslint-disable-next-line no-console
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

