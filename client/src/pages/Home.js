import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-content">
          <h1>Take Control of Your Finances</h1>
          <p>Track your expenses, visualize spending patterns, and make smarter financial decisions.</p>
          <div className="hero-btns">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500x400" alt="Expense Tracker" />
        </div>
      </div>
      
      <div className="features">
        <h2>Why Choose Our Expense Tracker?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Visual Analytics</h3>
            <p>See where your money goes with intuitive charts and graphs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Easy to Use</h3>
            <p>Simple interface for quick expense tracking on the go.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3>Secure</h3>
            <p>Your financial data is protected with secure authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;