// backend/routes/triageRoutes.js
import express from 'express';
import { createTriage, listTriage, updateTriage } from '../controllers/triageController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post('/', protect, createTriage);
router.get('/', protect, listTriage);
router.patch('/:id', protect, updateTriage);

export default router;
