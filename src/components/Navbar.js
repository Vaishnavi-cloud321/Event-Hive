import React, { useState } from 'react';

function Navbar({ user, onLogout, onNavigate, currentPage }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { id: 'events', label: 'All Events', icon: 'fas fa-calendar-alt' },
    { id: 'recommendations', label: 'Recommendations', icon: 'fas fa-magic' },
    { id: 'registrations', label: 'My Registrations', icon: 'fas fa-book-mark' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => onNavigate('dashboard')}>
          <i className="fas fa-calendar-check"></i>
          <span className="navbar-logo-text">EventHive</span>
        </div>
        
        <div className="navbar-menu">
          {navItems.map(item => (
            <a 
              key={item.id}
              className={`navbar-menu-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <i className={item.icon}></i> {item.label}
            </a>
          ))}
        </div>

        <div className="navbar-user-section">
          <span className="navbar-user-email">{user.email}</span>
          <button 
            className="navbar-user-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="fas fa-user-circle"></i>
          </button>
          
          {showDropdown && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-item">{user.firstName} {user.lastName}</div>
              <hr className="navbar-dropdown-divider" />
              <button
                className="navbar-logout-btn"
                onClick={onLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;