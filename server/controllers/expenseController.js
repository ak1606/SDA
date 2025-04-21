const Expense = require('../models/Expense');

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add new expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const newExpense = new Expense({
      title,
      amount,
      category,
      date: date || Date.now(),
      user: req.user.id
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  // Build expense object
  const expenseFields = {};
  if (title) expenseFields.title = title;
  if (amount) expenseFields.amount = amount;
  if (category) expenseFields.category = category;
  if (date) expenseFields.date = date;

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: expenseFields },
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Expense.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get expense statistics
exports.getStats = async (req, res) => {
  try {
    // Totals by category
    const categoryStats = await Expense.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);

    // Monthly totals
    const monthlyStats = await Expense.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: { 
            year: { $year: '$date' }, 
            month: { $month: '$date' } 
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({ 
      categoryStats,
      monthlyStats
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};