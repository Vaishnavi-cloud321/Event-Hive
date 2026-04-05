import React from 'react';

function RegistrationsPage({ registeredEvents }) {
  return (
    <div className="page dashboard">
      <div className="dashboard-welcome">
        <h1>
          <i className="fas fa-book-mark" style={{ marginRight: '10px', color: '#9b8dd4' }}></i>
          My Registrations
        </h1>
        <p>View all your event registrations</p>
      </div>

      <div className="registrations-section" style={{ marginTop: '40px' }}>
        <h2>
          Total Registrations: {registeredEvents.length}
        </h2>
        
        {registeredEvents.length > 0 ? (
          <div className="registrations-list">
            {registeredEvents.map((event, index) => (
              <div key={index} className="registration-item">
                <div className="registration-info">
                  <h3>{event.name}</h3>
                  <p>
                    <i className="fas fa-user" style={{ marginRight: '5px' }}></i>
                    <strong>Name:</strong> {event.registrationDetails.fullName}
                  </p>
                  <p>
                    <i className="fas fa-envelope" style={{ marginRight: '5px' }}></i>
                    <strong>Email:</strong> {event.registrationDetails.email}
                  </p>
                  <p>
                    <i className="fas fa-phone" style={{ marginRight: '5px' }}></i>
                    <strong>Phone:</strong> {event.registrationDetails.phone}
                  </p>
                  <p>
                    <i className="fas fa-calendar" style={{ marginRight: '5px' }}></i>
                    <strong>Registered:</strong> {event.registeredAt}
                  </p>
                  <p>
                    <strong style={{ color: '#28a745', fontSize: '16px' }}>₹ {event.price.toLocaleString('en-IN')}</strong>
                  </p>
                </div>
                <div className="registration-status">
                  <i className="fas fa-check-circle" style={{ marginRight: '5px' }}></i>
                  Registered
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-message">
            <i className="fas fa-inbox"></i>
            <p>No registrations yet</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontSize: '14px' }}>
              Head to All Events to register for your first event!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationsPage;