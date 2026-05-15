import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const startServer = async () => {
  const app = express();

  // 1. З’єднання з базою перед запуском
  await connectMongoDB();

  // 2. Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // 3. Реєстрація маршрутів (без префікса /notes тут)
  app.use(notesRouter);

  // 4. Обробка 404
  app.use(notFoundHandler);

  // 5. Обробка помилок
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
