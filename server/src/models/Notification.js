import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error'],
      default: 'info'
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    target: { type: String, required: true }, // e.g. mechanic name or 'all'
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', NotificationSchema);

