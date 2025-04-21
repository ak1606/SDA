import React from 'react';
import './ExpenseItem.css';

const ExpenseItem = ({ expense, setCurrentExpense, deleteExpense }) => {
  const { _id, title, amount, category, date } = expense;

  const onEdit = () => {
    setCurrentExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(_id);
    }
  };

  // Format date
  const formatDate = date => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Get category icon
  const getCategoryIcon = category => {
    switch (category) {
      case 'Food':
        return 'fas fa-utensils';
      case 'Transportation':
        return 'fas fa-car';
      case 'Entertainment':
        return 'fas fa-film';
      case 'Shopping':
        return 'fas fa-shopping-bag';
      case 'Utilities':
        return 'fas fa-lightbulb';
      case 'Healthcare':
        return 'fas fa-medkit';
      case 'Education':
        return 'fas fa-graduation-cap';
      default:
        return 'fas fa-receipt';
    }
  };

  // Get category color
  const getCategoryColor = category => {
    switch (category) {
      case 'Food':
        return '#ff7675';
      case 'Transportation':
        return '#74b9ff';
      case 'Entertainment':
        return '#a29bfe';
      case 'Shopping':
        return '#fd79a8';
      case 'Utilities':
        return '#ffeaa7';
      case 'Healthcare':
        return '#55efc4';
      case 'Education':
        return '#81ecec';
      default:
        return '#dfe6e9';
    }
  };

  return (
    <div className="expense-item">
      <div 
        className="category-icon" 
        style={{ backgroundColor: getCategoryColor(category) }}
      >
        <i className={getCategoryIcon(category)}></i>
      </div>
      <div className="expense-details">
        <h3 className="expense-title">{title}</h3>
        <p className="expense-date">{formatDate(date)}</p>
      </div>
      <div className="expense-amount">${amount.toFixed(2)}</div>
      <div className="expense-actions">
        <button className="action-btn edit-btn" onClick={onEdit}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="action-btn delete-btn" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;