import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import expenseReducer from './expenseReducer';
import { AuthContext } from './AuthContext';

// Initial state
const initialState = {
  expenses: [],
  stats: null,
  loading: true,
  error: null
};

// Create context
export const ExpenseContext = createContext(initialState);

// Provider component
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { token } = useContext(AuthContext);

  // Get Expenses
  const getExpenses = async () => {
    try {
      const res = await axios.get('/api/expenses', {
        headers: { 'x-auth-token': token }
      });

      dispatch({
        type: 'GET_EXPENSES',
        payload: res.data
      });
    } catch (err) {
      dispatch({ 
        type: 'EXPENSE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Add Expense
  const addExpense = async expense => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    try {
      const res = await axios.post('/api/expenses', expense, config);

      dispatch({
        type: 'ADD_EXPENSE',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Delete Expense
  const deleteExpense = async id => {
    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: { 'x-auth-token': token }
      });

      dispatch({
        type: 'DELETE_EXPENSE',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Update Expense
  const updateExpense = async expense => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    try {
      const res = await axios.put(`/api/expenses/${expense._id}`, expense, config);

      dispatch({
        type: 'UPDATE_EXPENSE',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get Statistics
  const getStats = async () => {
    try {
      const res = await axios.get('/api/expenses/stats', {
        headers: { 'x-auth-token': token }
      });

      dispatch({
        type: 'GET_STATS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        stats: state.stats,
        loading: state.loading,
        error: state.error,
        getExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
        getStats,
        clearErrors
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};