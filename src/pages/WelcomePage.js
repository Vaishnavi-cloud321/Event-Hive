import React from 'react';

function WelcomePage({ onLogin }) {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <div className="welcome-logo">
          <i className="fas fa-calendar-check"></i>
          <span>EventHive</span>
        </div>
        <button className="welcome-login-btn" onClick={onLogin}>
          <i className="fas fa-sign-in-alt"></i>
          Login
        </button>
      </div>

      <div className="welcome-hero">
        <div className="welcome-hero-icon">
          <i className="fas fa-calendar-alt"></i>
        </div>
        
        <h1>Welcome to EventHive</h1>
        
        <h2>Discover and Register for the Best Technical Events</h2>
        
        <p>Connect with industry experts, learn cutting-edge technologies, and grow your career through our carefully curated technical events and workshops.</p>

        <div style={{ marginBottom: '60px' }}>
          <button className="welcome-login-btn" onClick={onLogin} style={{ padding: '15px 50px', fontSize: '16px' }}>
            <i className="fas fa-rocket"></i>
            Get Started
          </button>
        </div>

        <div className="welcome-features">
          <div className="welcome-feature-card">
            <i className="fas fa-brain"></i>
            <h3>AI & ML Events</h3>
            <p>Learn cutting-edge artificial intelligence and machine learning from industry experts</p>
          </div>
          <div className="welcome-feature-card">
            <i className="fas fa-code"></i>
            <h3>Web Development</h3>
            <p>Master modern web technologies, frameworks, and best development practices</p>
          </div>
          <div className="welcome-feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Cybersecurity</h3>
            <p>Understand security best practices and learn ethical hacking techniques</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;