import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import { connectDB } from './config/db';
import appRoutes from './routes/index';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1',appRoutes);


// Default route
app.get('/', (_req, res) => {
  res.send('API is running...');
});

connectDB()
  .then(() => {
    console.log(`database connection successful`);
  })
  .catch(() => {
    console.log(`database not connected`);
  });

// Error handling middleware
app.use(errorHandler);

export default app;
