import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import RegistrationsPage from './pages/RegistrationsPage';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRegistrations = localStorage.getItem('registeredEvents');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
    if (savedRegistrations) {
      setRegisteredEvents(JSON.parse(savedRegistrations));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('registeredEvents');
    setCurrentPage('welcome');
  };

  const handleUpdateRegistrations = (newRegistrations) => {
    setRegisteredEvents(newRegistrations);
    localStorage.setItem('registeredEvents', JSON.stringify(newRegistrations));
  };

  return (
    <div className="app-container">
      {user && (
        <Navbar 
          user={user} 
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )}
      <div className="app-content">
        {!user && currentPage === 'welcome' && (
          <WelcomePage onLogin={() => setCurrentPage('login')} />
        )}
        {!user && currentPage === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setCurrentPage('signup')}
            onBack={() => setCurrentPage('welcome')}
          />
        )}
        {!user && currentPage === 'signup' && (
          <Signup 
            onSignup={handleLogin} 
            onSwitchToLogin={() => setCurrentPage('login')}
            onBack={() => setCurrentPage('welcome')}
          />
        )}
        {user && currentPage === 'dashboard' && (
          <DashboardPage 
            user={user}
            registeredEvents={registeredEvents}
            onUpdateRegistrations={handleUpdateRegistrations}
          />
        )}
        {user && currentPage === 'events' && (
          <EventsPage
            registeredEvents={registeredEvents}
            onUpdateRegistrations={handleUpdateRegistrations}
          />
        )}
        {user && currentPage === 'recommendations' && (
          <RecommendationsPage
            registeredEvents={registeredEvents}
            onUpdateRegistrations={handleUpdateRegistrations}
          />
        )}
        {user && currentPage === 'registrations' && (
          <RegistrationsPage registeredEvents={registeredEvents} />
        )}
      </div>
    </div>
  );
}

export default App;