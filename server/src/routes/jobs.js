import express from 'express';
import { Job } from '../models/Job.js';
import { User } from '../models/User.js';

const router = express.Router();

// GET /api/jobs
router.get('/', async (_req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

// GET /api/jobs/public
// Used by home page to show available job IDs + phone.
router.get('/public', async (_req, res) => {
  try {
    const jobs = await Job.find({}, { id: 1, customerPhone: 1, vehicle: 1, customer: 1 }).sort({ createdAt: -1 });
    res.json(
      jobs
        .filter(j => j.id)
        .map(j => ({
          id: j.id,
          customerPhone: j.customerPhone || '',
          vehicle: j.vehicle || '',
          customer: j.customer || ''
        }))
    );
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch public jobs', error: error.message });
  }
});

// GET /api/jobs/track/:jobId?phone=...
// Public tracking endpoint. Returns limited fields if phone matches (or if no phone stored).
router.get('/track/:jobId', async (req, res) => {
  try {
    const job = await Job.findOne({ id: req.params.jobId });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const phone = (req.query.phone || '').toString().trim();
    const storedPhone = (job.customerPhone || '').toString().trim();
    if (storedPhone && phone && storedPhone !== phone) {
      return res.status(403).json({ message: 'Phone number does not match' });
    }

    let mechanicPhone = '';
    if (job.mechanic && job.mechanic !== 'Unassigned') {
      const mechUser = await User.findOne({ name: job.mechanic, role: 'mechanic' });
      if (mechUser && mechUser.phone) {
        mechanicPhone = mechUser.phone;
      }
    }

    return res.json({
      id: job.id,
      vehicle: job.vehicle,
      vehicleNumber: job.vehicleNumber,
      customer: job.customer,
      customerPhone: job.customerPhone,
      status: job.status,
      delivery: job.delivery,
      mechanic: job.mechanic,
      mechanicPhone: mechanicPhone,
      date: job.date,
      serviceType: job.serviceType,
      bill: job.bill ? {
        items: job.bill.items || [],
        approved: job.bill.approved,
        paid: job.bill.paid,
        subtotal: job.bill.subtotal
      } : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to track job', error: error.message });
  }
});

// POST /api/jobs
router.post('/', async (req, res) => {
  try {
    if (!req.body.jobCode && req.body.id) {
      req.body.jobCode = req.body.id;
    }
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create job', error: error.message });
  }
});

// PATCH /api/jobs/:id  (id is the app-level job code, not Mongo _id)
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update job', error: error.message });
  }
});

// DELETE /api/jobs/:id
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ id: req.params.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
});

export default router;

