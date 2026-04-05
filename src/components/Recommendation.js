import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';

function Recommendation({ events, onRegister, onPay }) {
  const [selectedInterest, setSelectedInterest] = useState(null);

  const recommendedEvents = useMemo(() => {
    if (!selectedInterest) return [];
    
    return events.filter(event => 
      event.category.toLowerCase() === selectedInterest.toLowerCase()
    );
  }, [selectedInterest, events]);

  const categories = ['AI', 'Web', 'Security'];

  return (
    <div className="recommendation-section">
      <h2>
        <i className="fas fa-magic" style={{ marginRight: '10px' }}></i>
        Recommended for You
      </h2>

      <p className="recommendation-description">
        Select an interest to see personalized recommendations
      </p>

      <div className="interest-selector">
        {categories.map(category => (
          <button
            key={category}
            className={`interest-btn ${selectedInterest === category ? 'active' : ''}`}
            onClick={() => setSelectedInterest(selectedInterest === category ? null : category)}
          >
            <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
            {category}
          </button>
        ))}
      </div>

      {selectedInterest && (
        <div>
          <h3 className="recommendation-title">
            {selectedInterest} Events
          </h3>
          {recommendedEvents.length > 0 ? (
            <div className="events-grid">
              {recommendedEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={onRegister}
                  onPay={onPay}
                />
              ))}
            </div>
          ) : (
            <div className="empty-message">
              <i className="fas fa-inbox"></i>
              <p>No {selectedInterest} events available right now</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Recommendation;