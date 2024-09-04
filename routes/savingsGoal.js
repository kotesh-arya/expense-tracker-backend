import express from 'express';
import { addSavingsGoal, getSavingsGoals, updateSavingsGoal, deleteSavingsGoal } from '../controllers/savingsGoal.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Add a new savings goal
router.post('/', authMiddleware, addSavingsGoal);

// Get all savings goals for a user
router.get('/', authMiddleware, getSavingsGoals);

// Update a savings goal
router.put('/:id', authMiddleware, updateSavingsGoal);

// Delete a savings goal
router.delete('/:id', authMiddleware, deleteSavingsGoal);

export default router;
