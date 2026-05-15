import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in .env');
    }

    await mongoose.connect(mongoUrl);
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('Error while setting up mongo connection', error);
    throw error;
  }
};
