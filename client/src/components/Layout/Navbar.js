import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>
        <span className="user-name">Hello, {user && user.name}</span>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>
          <Link to="/">
            <i className="fas fa-wallet"></i> ExpenseTracker
          </Link>
        </h1>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;

