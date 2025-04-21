const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

// @route   GET api/expenses
// @desc    Get all user's expenses
// @access  Private
router.get('/', auth, expenseController.getExpenses);

// @route   POST api/expenses
// @desc    Add new expense
// @access  Private
router.post('/', auth, expenseController.addExpense);

// @route   PUT api/expenses/:id
// @desc    Update expense
// @access  Private
router.put('/:id', auth, expenseController.updateExpense);

// @route   DELETE api/expenses/:id
// @desc    Delete expense
// @access  Private
router.delete('/:id', auth, expenseController.deleteExpense);

// @route   GET api/expenses/stats
// @desc    Get expense statistics
// @access  Private
router.get('/stats', auth, expenseController.getStats);

module.exports = router;