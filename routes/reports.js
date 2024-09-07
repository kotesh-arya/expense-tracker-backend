import express from 'express';
import { generateReport } from '../controllers/reports.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Get financial report for a user
router.get('/', authMiddleware, generateReport);

export default router;
