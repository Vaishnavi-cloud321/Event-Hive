import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/Modal/RegistrationModal';
import PaymentModal from '../components/Modal/PaymentModal';

function EventsPage({ registeredEvents, onUpdateRegistrations }) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
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
    },
    {
      id: 4,
      name: 'Deep Learning Fundamentals',
      category: 'AI',
      price: 5999,
      description: 'Explore neural networks, deep learning frameworks, and practical implementations.'
    },
    {
      id: 5,
      name: 'Next.js & Full-Stack Development',
      category: 'Web',
      price: 4499,
      description: 'Build full-stack applications using Next.js, TypeScript, and modern tools.'
    },
    {
      id: 6,
      name: 'Cybersecurity Bootcamp',
      category: 'Security',
      price: 6999,
      description: 'Intensive bootcamp covering penetration testing, ethical hacking, and defense strategies.'
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
          <i className="fas fa-calendar-alt" style={{ marginRight: '10px', color: '#9b8dd4' }}></i>
          All Available Events
        </h1>
        <p>Choose from our collection of technical events and workshops</p>
      </div>

      <div className="events-grid" style={{ marginTop: '40px' }}>
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onRegister={handleRegister}
            onPay={handlePay}
          />
        ))}
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

export default EventsPage;