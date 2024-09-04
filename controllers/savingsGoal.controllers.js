import SavingsGoal from '../models/savingsGoal.model.js';

// Add a new savings goal
export const addSavingsGoal = async (req, res) => {
  const { name, targetAmount, deadline, currentAmount } = req.body;

  try {
    const savingsGoal = new SavingsGoal({
      user: req.user.id,
      name,
      targetAmount,
      currentAmount,
      deadline,
    });

    await savingsGoal.save();
    res.json(savingsGoal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all savings goals for the authenticated user
export const getSavingsGoals = async (req, res) => {
  try {
    const savingsGoals = await SavingsGoal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(savingsGoals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a savings goal
export const updateSavingsGoal = async (req, res) => {
  const { name, targetAmount, currentAmount, deadline } = req.body;

  try {
    let savingsGoal = await SavingsGoal.findById(req.params.id);

    if (!savingsGoal) {
      return res.status(404).json({ msg: 'Savings goal not found' });
    }

    // Make sure the user owns the savings goal
    if (savingsGoal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    savingsGoal = await SavingsGoal.findByIdAndUpdate(
      req.params.id,
      { name, targetAmount, currentAmount, deadline },
      { new: true }
    );

    res.json(savingsGoal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a savings goal
export const deleteSavingsGoal = async (req, res) => {
  try {
    let savingsGoal = await SavingsGoal.findById(req.params.id);

    if (!savingsGoal) {
      return res.status(404).json({ msg: 'Savings goal not found' });
    }

    // Make sure the user owns the savings goal
    if (savingsGoal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await SavingsGoal.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Savings goal removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
