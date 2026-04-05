import React, { useState } from 'react';

function RegistrationModal({ isOpen, event, onClose, onConfirm }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !phone) {
      setError('Please fill in all fields');
      return;
    }

    if (phone.length < 10) {
      setError('Phone number must be at least 10 digits');
      return;
    }

    onConfirm({
      fullName,
      email,
      phone
    });

    setFullName('');
    setEmail('');
    setPhone('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Register for {event?.name}</h2>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
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
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError('');
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationModal;