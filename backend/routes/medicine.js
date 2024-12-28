import express from 'express';
import { addMedicine, getMedicines, updateMedicine, deleteMedicine } from '../controllers/medicineController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Add medicine route
router.post('/', authenticate, addMedicine);

// Get medicines route
router.get('/', authenticate, getMedicines);

// Update medicine route (PUT)
router.put('/:id', authenticate, updateMedicine);

// Delete medicine route (DELETE)
router.delete('/:id', authenticate, deleteMedicine);

export default router;
