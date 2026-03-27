import 'dotenv/config';
import { connectDB } from '../config/db.js';
import { Job } from '../models/Job.js';

const run = async () => {
  await connectDB();

  // migrate old documents that may have `jobCode` but not `id`
  const jobs = await Job.find({ id: { $exists: false } });
  let updated = 0;

  for (const j of jobs) {
    const jobCode = j.jobCode;
    if (typeof jobCode === 'string' && jobCode.trim()) {
      j.id = jobCode.trim();
      await j.save();
      updated += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Migrated jobs: ${updated}`);
  process.exit(0);
};

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

