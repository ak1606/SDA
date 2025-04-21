import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const history = useHistory();
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
    
    if (error) {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error, history]);
  
  const { name, email, password, password2 } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        {alert && <div className="alert alert-danger">{alert}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              className="form-control"
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm your password"
              className="form-control"
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
