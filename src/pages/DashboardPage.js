import React from 'react';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/Modal/RegistrationModal';
import PaymentModal from '../components/Modal/PaymentModal';
import { useState } from 'react';

function DashboardPage({ user, registeredEvents, onUpdateRegistrations }) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const featuredEvents = [
    {
      id: 1,
      name: 'AI Workshop 2024',
      category: 'AI',
      price: 4999,
      description: 'Learn cutting-edge AI and Machine Learning technologies from industry experts.'
    },
    {
      id: 2,
      name: 'Advanced React Masterclass',
      category: 'Web',
      price: 3999,
      description: 'Master React hooks, state management, and advanced patterns in modern web development.'
    },
    {
      id: 3,
      name: 'Web Security Essentials',
      category: 'Security',
      price: 5499,
      description: 'Understand and implement security best practices for web applications.'
    }
  ];

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistrationConfirm = (details) => {
    const newRegistration = {
      ...selectedEvent,
      registrationDetails: details,
      registeredAt: new Date().toLocaleDateString()
    };

    const updatedEvents = [...registeredEvents, newRegistration];
    onUpdateRegistrations(updatedEvents);
    
    setShowRegistrationModal(false);
    alert(`✅ Successfully registered for ${selectedEvent.name}!`);
  };

  const handlePay = (event) => {
    setSelectedEvent(event);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    alert(`🎉 Payment successful!\n\nAmount Paid: ₹${selectedEvent.price}\nEvent: ${selectedEvent.name}\n\nThank you!`);
    setShowPaymentModal(false);
  };

  return (
    <div className="page dashboard">
      <div className="dashboard-welcome">
        <h1>
          <i className="fas fa-wave-hand" style={{ marginRight: '10px', color: '#9b8dd4' }}></i>
          Welcome, {user.firstName}! 👋
        </h1>
        <p>Explore amazing technical events and expand your skills</p>
      </div>

      <div style={{ marginBottom: '40px', marginTop: '40px' }}>
        <h2 className="section-title">
          <i className="fas fa-star" style={{ marginRight: '10px' }}></i>
          Featured Events
        </h2>
        <div className="events-grid">
          {featuredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              onPay={handlePay}
            />
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(102, 126, 234, 0.08)',
        border: '1px solid rgba(155, 141, 212, 0.2)',
        padding: '30px',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#9b8dd4', marginBottom: '15px' }}>
          <i className="fas fa-arrow-right"></i> Explore More Events
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
          Check out all available events or get personalized recommendations
        </p>
      </div>

      <RegistrationModal
        isOpen={showRegistrationModal}
        event={selectedEvent}
        onClose={() => setShowRegistrationModal(false)}
        onConfirm={handleRegistrationConfirm}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        event={selectedEvent}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
}

export default DashboardPage;