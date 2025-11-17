// backend/controllers/triageController.js
import Triage from '../models/Triage.js';

// Rule-based triage
function categorize({ symptoms, vitals }) {
  const s = (symptoms || '').toLowerCase();
  if (s.includes('chest') || s.includes('breath') || (vitals?.oxygen && vitals.oxygen < 92)) {
    return { category: 'Critical', urgent: true };
  }
  if (s.includes('fever') || s.includes('severe')) {
    return { category: 'Moderate', urgent: false };
  }
  return { category: 'Low', urgent: false };
}

export const createTriage = async (req, res) => {
  const { symptoms, vitals } = req.body;
  if (!symptoms) return res.status(400).json({ message: 'Symptoms required' });
  const { category, urgent } = categorize({ symptoms, vitals });
  const triage = await Triage.create({ patient: req.patient._id, symptoms, vitals, category, urgent });
  res.status(201).json(triage);
};

export const listTriage = async (req, res) => {
  const items = await Triage.find().populate('patient', 'name email').sort({ createdAt: -1 });
  res.json(items);
};

export const updateTriage = async (req, res) => {
  const triage = await Triage.findById(req.params.id);
  if (!triage) return res.status(404).json({ message: 'Not found' });
  if (req.body.reviewed !== undefined) triage.reviewed = req.body.reviewed;
  if (req.body.urgent !== undefined) triage.urgent = req.body.urgent;
  await triage.save();
  res.json(triage);
};
