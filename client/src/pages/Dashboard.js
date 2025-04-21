import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import Summary from '../components/dashboard/Summary';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseChart from '../components/visualizations/ExpenseChart';
import Spinner from '../components/Layout/Spinner';
import './Dashboard.css';

const Dashboard = () => {
  const { loading, getExpenses, expenses } = useContext(ExpenseContext);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <Summary />

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <ExpenseForm 
            currentExpense={currentExpense} 
            setCurrentExpense={setCurrentExpense} 
          />
          {expenses && expenses.length > 0 && (
            <ExpenseChart />
          )}
        </div>

        <div className="dashboard-sidebar">
          <ExpenseList setCurrentExpense={setCurrentExpense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

