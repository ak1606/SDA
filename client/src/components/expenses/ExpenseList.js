import React, { useContext, useEffect } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
import Spinner from '../Layout/Spinner';
import './ExpenseList.css';

const ExpenseList = ({ setCurrentExpense }) => {
  const { expenses, loading, getExpenses, deleteExpense } = useContext(ExpenseContext);

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (expenses && expenses.length === 0) {
    return <p className="no-expenses">No expenses found. Add one to get started!</p>;
  }

  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      {expenses.map(expense => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          setCurrentExpense={setCurrentExpense}
          deleteExpense={deleteExpense}
        />
      ))}
    </div>
  );
};

export default ExpenseList;