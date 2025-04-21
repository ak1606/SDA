import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import './ExpenseForm.css';

const ExpenseForm = ({ currentExpense, setCurrentExpense }) => {
  const { addExpense, updateExpense } = useContext(ExpenseContext);
  
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().substr(0, 10)
  });

  useEffect(() => {
    if (currentExpense !== null) {
      setExpense({
        ...currentExpense,
        date: new Date(currentExpense.date).toISOString().substr(0, 10)
      });
    }
  }, [currentExpense]);

  const { title, amount, category, date } = expense;
  const onChange = e => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (title === '' || amount === '') {
      alert('Please fill in all fields');
      return;
    }

    const newExpense = {
      ...expense,
      amount: parseFloat(amount)
    };

    if (currentExpense === null) {
      addExpense(newExpense);
    } else {
      updateExpense(newExpense);
      setCurrentExpense(null);
    }

    // Clear form
    setExpense({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().substr(0, 10)
    });
  };

  const clearForm = () => {
    setExpense({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().substr(0, 10)
    });
    setCurrentExpense(null);
  };

  return (
    <div className="expense-form-container">
      <h2>{currentExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter expense title"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            placeholder="Enter amount"
            className="form-control"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={category}
            onChange={onChange}
            className="form-control"
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {currentExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {currentExpense && (
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;