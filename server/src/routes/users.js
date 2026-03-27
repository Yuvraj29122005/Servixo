import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// GET /api/users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// POST /api/users  (used by admin to create mechanics)
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role, id, credentials, phone, mechanicId } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'name, email, password and role are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id,
      name,
      email,
      passwordHash,
      role,
      credentials: credentials ?? true,
      phone,
      mechanicId
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error: error.message });
  }
});

// PATCH /api/users/:id  (id is the app-level string id, not Mongo _id)
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
});

export default router;

