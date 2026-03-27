import mongoose from 'mongoose';

const AppSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // "default"
    centerName: { type: String, default: 'Servixo Main Branch' },
    supportContact: { type: String, default: '' },
    emailNotifications: { type: Boolean, default: true },
    jobUpdates: { type: Boolean, default: true },
    mechanicAlerts: { type: Boolean, default: true },
    customerMessages: { type: Boolean, default: false },
    dailyReport: { type: Boolean, default: true },
    sessionTimeout: { type: String, default: '30' }
  },
  { timestamps: true }
);

export const AppSettings = mongoose.model('AppSettings', AppSettingsSchema);

