import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    // Frontend uses this string id (e.g. "1", "2")
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'mechanic', 'customer', 'manager'],
      required: true
    },
    credentials: { type: Boolean, default: false },
    phone: { type: String },
    mechanicId: { type: String },
    specialization: { type: String }
    // You can extend later with email, password hash, etc.
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);

