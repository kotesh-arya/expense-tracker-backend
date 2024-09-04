import express from 'express';
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transaction.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Add a new transaction
router.post('/', authMiddleware, addTransaction);

// Get all transactions for a user
router.get('/', authMiddleware, getTransactions);

// Update a transaction
router.put('/:id', authMiddleware, updateTransaction);

// Delete a transaction
router.delete('/:id', authMiddleware, deleteTransaction);

export default router;
