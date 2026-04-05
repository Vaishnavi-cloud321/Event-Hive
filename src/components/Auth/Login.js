import React, { useState } from 'react';

function Login({ onLogin, onSwitchToSignup, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (email.length < 5) {
      setError('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const user = {
      email,
      firstName: 'User',
      lastName: 'Guest'
    };

    onLogin(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="auth-back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>

        <h2>
          <i className="fas fa-sign-in-alt" style={{ marginRight: '10px' }}></i>
          Welcome Back 👋
        </h2>

        <p className="auth-subtitle">Sign in to your EventHive account</p>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <i className="fas fa-lock-open" style={{ marginRight: '8px' }}></i>
            SIGN IN
          </button>
        </form>

        <div className="auth-link">
          Don't have an account?{' '}
          <a onClick={onSwitchToSignup}>Create one</a>
        </div>

        <div className="demo-box">
          <i className="fas fa-info-circle"></i>
          <strong>Demo Credentials:</strong>
          <div>Email: <span>demo@eventhive.com</span></div>
          <div>Password: <span>demo123</span></div>
        </div>
      </div>
    </div>
  );
}

export default Login;