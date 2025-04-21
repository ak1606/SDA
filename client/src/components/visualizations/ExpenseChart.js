import React, { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './ExpenseChart.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ExpenseChart = () => {
  const { expenses } = useContext(ExpenseContext);
  const [chartType, setChartType] = useState('pie');
  
  // Process data for charts
  const processDataForPieChart = () => {
    const categoryData = {};
    
    expenses.forEach(expense => {
      if (categoryData[expense.category]) {
        categoryData[expense.category] += expense.amount;
      } else {
        categoryData[expense.category] = expense.amount;
      }
    });
    
    return {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: [
            '#ff7675',  // Food
            '#74b9ff',  // Transportation
            '#a29bfe',  // Entertainment
            '#fd79a8',  // Shopping
            '#ffeaa7',  // Utilities
            '#55efc4',  // Healthcare
            '#81ecec',  // Education
            '#dfe6e9',  // Others
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const processDataForBarChart = () => {
    // Group by month
    const monthlyData = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${months[date.getMonth()]} ${date.getFullYear()}`;
      
      if (monthlyData[monthYear]) {
        monthlyData[monthYear] += expense.amount;
      } else {
        monthlyData[monthYear] = expense.amount;
      }
    });
    
    // Sort by date
    const sortedLabels = Object.keys(monthlyData).sort((a, b) => {
      const [aMonth, aYear] = a.split(' ');
      const [bMonth, bYear] = b.split(' ');
      
      if (aYear !== bYear) {
        return aYear - bYear;
      }
      
      return months.indexOf(aMonth) - months.indexOf(bMonth);
    });
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: 'Monthly Expenses',
          data: sortedLabels.map(label => monthlyData[label]),
          backgroundColor: '#6c5ce7',
        },
      ],
    };
  };

  const pieChartData = expenses ? processDataForPieChart() : null;
  const barChartData = expenses ? processDataForBarChart() : null;

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        font: {
          size: 16
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
        font: {
          size: 16
        }
      }
    }
  };

  if (!expenses || expenses.length === 0) {
    return <div className="no-data">Add expenses to see charts</div>;
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Expense Analysis</h2>
        <div className="chart-toggle">
          <button 
            className={`chart-toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            <i className="fas fa-chart-pie"></i> Category
          </button>
          <button 
            className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            <i className="fas fa-chart-bar"></i> Monthly
          </button>
        </div>
      </div>
      
      <div className="chart">
        {chartType === 'pie' ? (
          <Pie data={pieChartData} options={pieOptions} />
        ) : (
          <Bar data={barChartData} options={barOptions} />
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;