import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

// Allow your frontend origin (Vite default is http://localhost:5173)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// mount routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running'));

export default app;
