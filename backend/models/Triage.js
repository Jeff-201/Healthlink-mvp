// backend/models/Triage.js
import mongoose from 'mongoose';

const triageSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  symptoms: { type: String, required: true },
  vitals: { type: Object, default: {} },
  category: { type: String, enum: ['Low', 'Moderate', 'Critical'], default: 'Low' },
  urgent: { type: Boolean, default: false },
  reviewed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Triage', triageSchema);
