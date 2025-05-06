import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import fileRoutes from './routes/fileRoutes';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
  });
  

const app = express();
app.use(limiter);
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

export default app;
