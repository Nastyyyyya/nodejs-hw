import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const startServer = async () => {
  const app = express();

  await connectMongoDB();

  // 2. Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.use(notesRouter);

  app.use(errors());

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
