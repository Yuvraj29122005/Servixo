import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';

const run = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'admin@servixo.com' });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log('Admin user already exists');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash('servixo@123', 10);

  const admin = await User.create({
    id: '1',
    name: 'Admin User',
    email: 'admin@servixo.com',
    passwordHash,
    role: 'admin',
    credentials: true
  });

  // eslint-disable-next-line no-console
  console.log('Seeded admin user:', admin.email);
  process.exit(0);
};

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

