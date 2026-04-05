import React from 'react';

function EventCard({ event, onRegister, onPay }) {
  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-category">
          <i className="fas fa-tag" style={{ marginRight: '5px' }}></i>
          {event.category}
        </div>
        <h3 className="event-name">{event.name}</h3>
        <div className="event-price">
          ₹ {event.price.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="event-body">
        <p className="event-description">{event.description}</p>
        <div className="event-actions">
          <button 
            className="btn-register"
            onClick={() => onRegister(event)}
          >
            <i className="fas fa-clipboard-check"></i> Register
          </button>
          <button 
            className="btn-pay"
            onClick={() => onPay(event)}
          >
            <i className="fas fa-credit-card"></i> Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;