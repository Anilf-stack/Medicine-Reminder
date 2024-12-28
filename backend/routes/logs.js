import express from 'express';
import { logAcknowledgment, getLogs } from '../controllers/logController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Endpoint to get logs
router.get('/', authenticate, getLogs);

// Endpoint to log acknowledgment
router.post('/', authenticate, logAcknowledgment);

export default router;
