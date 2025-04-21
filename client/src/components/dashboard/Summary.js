import React, { useContext, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import './Summary.css';

const Summary = () => {
  const { expenses } = useContext(ExpenseContext);

  // Calculate total expenses
  const totalExpenses = expenses
    ? expenses.reduce((acc, expense) => acc + expense.amount, 0)
    : 0;

  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses
    ? expenses
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          );
        })
        .reduce((acc, expense) => acc + expense.amount, 0)
    : 0;

  // Get expenses by category
  const expensesByCategory = {};
  if (expenses) {
    expenses.forEach(expense => {
      if (expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] += expense.amount;
      } else {
        expensesByCategory[expense.category] = expense.amount;
      }
    });
  }

  // Get top category
  let topCategory = { name: 'None', amount: 0 };
  Object.keys(expensesByCategory).forEach(category => {
    if (expensesByCategory[category] > topCategory.amount) {
      topCategory = { name: category, amount: expensesByCategory[category] };
    }
  });

  return (
    <div className="summary">
      <div className="summary-card total">
        <div className="summary-icon">
          <i className="fas fa-wallet"></i>
        </div>
        <div className="summary-details">
          <h3>Total Expenses</h3>
          <p className="summary-amount">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="summary-card monthly">
        <div className="summary-icon">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <div className="summary-details">
          <h3>This Month</h3>
          <p className="summary-amount">${monthlyExpenses.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="summary-card category">
        <div className="summary-icon">
          <i className="fas fa-chart-pie"></i>
        </div>
        <div className="summary-details">
          <h3>Top Category</h3>
          <p className="summary-amount">{topCategory.name}</p>
          <p className="summary-sub">${topCategory.amount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;