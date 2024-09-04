import express from 'express';
import { addBudget, getBudgets, updateBudget, deleteBudget } from '../controllers/budget.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Add a new budget
router.post('/', authMiddleware, addBudget);

// Get all budgets for a user
router.get('/', authMiddleware, getBudgets);

// Update a budget
router.put('/:id', authMiddleware, updateBudget);

// Delete a budget
router.delete('/:id', authMiddleware, deleteBudget);

export default router;
