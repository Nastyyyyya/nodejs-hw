import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      console.error('Configuration error: MONGO_URL is not defined in .env');
      process.exit(1); // Завершуємо процес, якщо немає змінної оточення
    }

    await mongoose.connect(mongoUrl);
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('Error while setting up mongo connection:', error.message);
    process.exit(1); // Явно завершуємо процес з ненульовим кодом виходу
  }
};
