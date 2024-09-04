import Budget from '../models/budget.model.js';

// Add a new budget
export const addBudget = async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;

  try {
    const budget = new Budget({
      user: req.user.id,
      category,
      amount,
      startDate,
      endDate,
    });

    await budget.save();
    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all budgets for the authenticated user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a budget
export const updateBudget = async (req, res) => {
  const { category, amount, startDate, endDate } = req.body;

  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    // Make sure the user owns the budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { category, amount, startDate, endDate },
      { new: true }
    );

    res.json(budget);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a budget
export const deleteBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found' });
    }

    // Make sure the user owns the budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Budget removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
