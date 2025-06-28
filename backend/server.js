import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

dotenv.config();

const app = express(); // ✅ app is created here

app.use(cors());
app.use(express.json());

// ✅ Define routes AFTER app is initialized
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
