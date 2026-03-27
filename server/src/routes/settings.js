import express from 'express';
import { AppSettings } from '../models/AppSettings.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings
router.get('/', requireAuth, requireRole(['admin']), async (_req, res) => {
  try {
    const doc = await AppSettings.findOne({ key: 'default' });
    if (!doc) {
      const created = await AppSettings.create({ key: 'default' });
      return res.json(created);
    }
    return res.json(doc);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load settings', error: error.message });
  }
});

// PATCH /api/settings
router.patch('/', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const updated = await AppSettings.findOneAndUpdate(
      { key: 'default' },
      { $set: req.body },
      { upsert: true, new: true, runValidators: true }
    );
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update settings', error: error.message });
  }
});

export default router;

