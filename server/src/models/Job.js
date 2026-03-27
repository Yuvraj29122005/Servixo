import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true }
  },
  { _id: false }
);

const BillItemSchema = new mongoose.Schema(
  {
    desc: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const BillSchema = new mongoose.Schema(
  {
    items: [BillItemSchema],
    subtotal: { type: Number, required: true },
    approved: { type: Boolean, default: false },
    paid: { type: Boolean, default: false }
  },
  { _id: false }
);

const JobSchema = new mongoose.Schema(
  {
    // App-level job identifier, e.g. JOB-2024-001
    id: { type: String, required: true, unique: true },
    // Backward-compat for older docs (if any)
    jobCode: { type: String },
    vehicle: { type: String, required: true },
    vehicleNumber: { type: String },
    customer: { type: String, required: true },
    customerPhone: { type: String },
    mechanic: { type: String },
    status: {
      type: String,
      enum: ['RECEIVED', 'INSPECTION', 'REPAIRING', 'QUALITY_CHECK', 'READY', 'DELIVERED'],
      default: 'RECEIVED'
    },
    date: { type: String },
    time: { type: String },
    dateCreated: { type: String },
    delivery: { type: String },
    issues: [{ type: String }],
    serviceType: { type: String },
    notes: [NoteSchema],
    bill: BillSchema
  },
  { timestamps: true }
);

export const Job = mongoose.model('Job', JobSchema);

