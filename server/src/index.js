import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import jobsRouter from './routes/jobs.js';
import usersRouter from './routes/users.js';
import notificationsRouter from './routes/notifications.js';
import authRouter from './routes/auth.js';
import settingsRouter from './routes/settings.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Servixo API is running' });
});

app.use('/api/auth', authRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/users', usersRouter);
app.use('/api/notifications', notificationsRouter);

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚗 Servixo API listening on port ${PORT}`);
  });
};

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});

