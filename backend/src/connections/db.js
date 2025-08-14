import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI not provided in .env');
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}
