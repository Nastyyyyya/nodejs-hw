import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/authenticate.js'; 

import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const startServer = async () => {
  const app = express();

  await connectMongoDB();

  app.use(logger);
  app.use(
    cors({
      origin: true, 
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use('/auth', authRouter);

  app.use('/notes', authenticate, notesRouter);

  app.use(errors());

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
