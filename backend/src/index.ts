import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import reviewRoutes from './routes/reviewRoutes';
import './types/type';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://book-review-delta.vercel.app', 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/review', reviewRoutes);

app.get('/health', (req, res) => {
  res.send('Server is up and running!');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not defined');
}

mongoose.connect(mongoUri).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}).catch(err => console.error(err));
