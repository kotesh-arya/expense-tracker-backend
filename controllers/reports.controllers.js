import Transaction from '../models/transaction.model.js';
import Budget from '../models/budget.model.js';
import SavingsGoal from '../models/savingsGoal.model.js';

// Generate a financial report
export const generateReport = async (req, res) => {
  const { startDate, endDate } = req.query; // Optionally filter by date range

  try {
    const userId = req.user.id;

    // Get transactions for the user within the date range
    const transactions = await Transaction.find({
      user: userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    // Calculate total income and expenses
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    // Group expenses by category
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

    // Get budgets and calculate budget utilization
    const budgets = await Budget.find({ user: userId });
    const budgetUtilization = budgets.map(budget => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((acc, curr) => acc + curr.amount, 0);
      return {
        category: budget.category,
        budgetAmount: budget.amount,
        spent,
        remaining: budget.amount - spent,
      };
    });

    // Get savings goals and calculate progress
    const savingsGoals = await SavingsGoal.find({ user: userId });
    const savingsProgress = savingsGoals.map(goal => ({
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      progress: ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2),
    }));

    res.json({
      totalIncome,
      totalExpenses,
      expensesByCategory,
      budgetUtilization,
      savingsProgress,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
