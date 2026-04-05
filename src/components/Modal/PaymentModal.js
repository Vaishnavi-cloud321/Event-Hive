import React, { useState } from 'react';

function PaymentModal({ isOpen, event, onClose, onConfirm }) {
  const [paymentStep, setPaymentStep] = useState('method'); // method, processing, success, failed
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [processingTime, setProcessingTime] = useState(0);

  const paymentMethods = [
    { id: 'phonepe', name: 'PhonePe', icon: 'fas fa-mobile-alt', color: '#5f27cd' },
    { id: 'googlepay', name: 'Google Pay', icon: 'fas fa-google', color: '#1f2937' },
    { id: 'paytm', name: 'Paytm', icon: 'fas fa-wallet', color: '#1890ff' },
    { id: 'card', name: 'Credit/Debit Card', icon: 'fas fa-credit-card', color: '#ff6b6b' },
    { id: 'upi', name: 'UPI', icon: 'fas fa-qrcode', color: '#ff9500' },
    { id: 'netbanking', name: 'Net Banking', icon: 'fas fa-university', color: '#00b894' }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setError('');
    
    if (methodId === 'upi' || methodId === 'phonepe' || methodId === 'googlepay' || methodId === 'paytm') {
      setPaymentStep('upi');
    } else if (methodId === 'card') {
      setPaymentStep('card');
    } else if (methodId === 'netbanking') {
      setPaymentStep('netbanking');
    }
  };

  // PhonePe/UPI Payment
  const handleUpiPayment = (e) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    if (phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }

    setShowOtpInput(true);
    setError('');
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    // Simulate payment processing
    setPaymentStep('processing');
    setProcessingTime(0);

    const interval = setInterval(() => {
      setProcessingTime(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate success (90% success rate for demo)
          setTimeout(() => {
            setPaymentStep('success');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);
  };

  // Card Payment
  const handleCardPayment = (e) => {
    e.preventDefault();
    setPaymentStep('processing');
    setProcessingTime(0);

    const interval = setInterval(() => {
      setProcessingTime(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPaymentStep('success');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 400);
  };

  // Net Banking Payment
  const handleNetBankingPayment = (e) => {
    e.preventDefault();
    setPaymentStep('processing');
    setProcessingTime(0);

    const interval = setInterval(() => {
      setProcessingTime(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPaymentStep('success');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 500);
  };

  const handleConfirmPayment = () => {
    onConfirm({
      method: selectedMethod,
      amount: event.price,
      transactionId: `TXN${Date.now()}`
    });
    
    // Reset form
    setPaymentStep('method');
    setSelectedMethod(null);
    setPhoneNumber('');
    setOtp('');
    setShowOtpInput(false);
    setError('');
    setProcessingTime(0);
  };

  const handleGoBack = () => {
    setPaymentStep('method');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {/* PAYMENT METHOD SELECTION */}
        {paymentStep === 'method' && (
          <div>
            <h2>
              <i className="fas fa-credit-card" style={{ marginRight: '10px' }}></i>
              Choose Payment Method
            </h2>
            <div style={{
              background: 'rgba(102, 126, 234, 0.15)',
              border: '2px solid #667eea',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#9b8dd4',
              fontWeight: '600'
            }}>
              <i className="fas fa-rupee-sign" style={{ marginRight: '8px' }}></i>
              Amount: <span style={{ fontSize: '20px' }}>₹ {event?.price?.toLocaleString('en-IN')}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '8px'
            }}>
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                  style={{
                    background: selectedMethod === method.id 
                      ? `rgba(102, 126, 234, 0.2)` 
                      : 'rgba(102, 126, 234, 0.05)',
                    border: selectedMethod === method.id 
                      ? '2px solid #667eea' 
                      : '1px solid rgba(155, 141, 212, 0.2)',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  className="payment-method-btn"
                >
                  <i className={method.icon} style={{ fontSize: '24px', color: method.color }}></i>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* UPI/PHONEPE PAYMENT */}
        {paymentStep === 'upi' && (
          <div>
            <button onClick={handleGoBack} className="auth-back-btn">
              <i className="fas fa-arrow-left"></i> Back
            </button>

            <h2>
              <i className="fas fa-mobile-alt" style={{ marginRight: '10px' }}></i>
              UPI Payment
            </h2>

            <div style={{
              background: 'rgba(102, 126, 234, 0.15)',
              border: '2px solid #667eea',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#9b8dd4',
              fontWeight: '600'
            }}>
              <i className="fas fa-rupee-sign" style={{ marginRight: '8px' }}></i>
              Amount: <span style={{ fontSize: '20px' }}>₹ {event?.price?.toLocaleString('en-IN')}</span>
            </div>

            {error && (
              <div className="auth-error">
                <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                {error}
              </div>
            )}

            {!showOtpInput ? (
              <form onSubmit={handleUpiPayment}>
                <div className="form-group">
                  <label>Phone Number Linked to UPI</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    style={{ fontSize: '16px' }}
                  />
                  <small style={{ color: 'rgba(255,255,255,0.5)', marginTop: '5px', display: 'block' }}>
                    Enter the phone number linked to your UPI account
                  </small>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-arrow-right" style={{ marginRight: '8px' }}></i>
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(155, 141, 212, 0.2)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '13px'
                }}>
                  <i className="fas fa-info-circle" style={{ marginRight: '8px', color: '#9b8dd4' }}></i>
                  OTP sent to <strong>+91 {phoneNumber}</strong>
                </div>

                <div className="form-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    style={{ fontSize: '24px', letterSpacing: '8px', textAlign: 'center' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
                  Verify OTP
                </button>

                <button
                  type="button"
                  onClick={() => setShowOtpInput(false)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'transparent',
                    border: '2px solid #667eea',
                    color: '#667eea',
                    borderRadius: '8px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Use Different Number
                </button>
              </form>
            )}
          </div>
        )}

        {/* CARD PAYMENT */}
        {paymentStep === 'card' && (
          <div>
            <button onClick={handleGoBack} className="auth-back-btn">
              <i className="fas fa-arrow-left"></i> Back
            </button>

            <h2>
              <i className="fas fa-credit-card" style={{ marginRight: '10px' }}></i>
              Debit/Credit Card
            </h2>

            <div style={{
              background: 'rgba(102, 126, 234, 0.15)',
              border: '2px solid #667eea',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#9b8dd4',
              fontWeight: '600'
            }}>
              <i className="fas fa-rupee-sign" style={{ marginRight: '8px' }}></i>
              Amount: <span style={{ fontSize: '20px' }}>₹ {event?.price?.toLocaleString('en-IN')}</span>
            </div>

            <form onSubmit={handleCardPayment}>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  defaultValue="4532 1234 5678 9010"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    placeholder="12/25"
                    maxLength="5"
                    defaultValue="12/25"
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="3"
                    defaultValue="123"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                <i className="fas fa-lock" style={{ marginRight: '8px' }}></i>
                Pay ₹ {event?.price?.toLocaleString('en-IN')}
              </button>
            </form>
          </div>
        )}

        {/* NET BANKING PAYMENT */}
        {paymentStep === 'netbanking' && (
          <div>
            <button onClick={handleGoBack} className="auth-back-btn">
              <i className="fas fa-arrow-left"></i> Back
            </button>

            <h2>
              <i className="fas fa-university" style={{ marginRight: '10px' }}></i>
              Select Bank
            </h2>

            <div style={{
              background: 'rgba(102, 126, 234, 0.15)',
              border: '2px solid #667eea',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: '#9b8dd4',
              fontWeight: '600'
            }}>
              <i className="fas fa-rupee-sign" style={{ marginRight: '8px' }}></i>
              Amount: <span style={{ fontSize: '20px' }}>₹ {event?.price?.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'grid', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
              {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank'].map(bank => (
                <button
                  key={bank}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNetBankingPayment(e);
                  }}
                  style={{
                    padding: '12px',
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(155, 141, 212, 0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  className="bank-btn"
                >
                  <i className="fas fa-university" style={{ marginRight: '10px', color: '#9b8dd4' }}></i>
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PROCESSING */}
        {paymentStep === 'processing' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              animation: 'spin 2s linear infinite'
            }}>
              <i className="fas fa-spinner"></i>
            </div>
            <h3 style={{ color: '#9b8dd4', marginBottom: '20px' }}>Processing Payment...</h3>
            
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                height: '8px',
                borderRadius: '8px',
                width: `${processingTime}%`,
                transition: 'width 0.1s ease'
              }}></div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
              {Math.round(processingTime)}% Complete
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {paymentStep === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              fontSize: '64px',
              color: '#28a745',
              marginBottom: '20px',
              animation: 'bounce 0.6s'
            }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 style={{ color: '#28a745', marginBottom: '10px' }}>Payment Successful!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
              Your event registration is confirmed
            </p>

            <div style={{
              background: 'rgba(40, 167, 69, 0.1)',
              border: '1px solid rgba(40, 167, 69, 0.3)',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px'
            }}>
              <p><strong>Amount:</strong> ₹ {event?.price?.toLocaleString('en-IN')}</p>
              <p><strong>Event:</strong> {event?.name}</p>
              <p><strong>Confirmation Email:</strong> Will be sent shortly</p>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="btn btn-primary"
            >
              <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
              Continue
            </button>
          </div>
        )}

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 100% { transform: scale(0.8); }
            50% { transform: scale(1.1); }
          }
          .payment-method-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          }
          .bank-btn:hover {
            background: rgba(102, 126, 234, 0.15);
            border-color: #667eea;
          }
        `}</style>
      </div>
    </div>
  );
}

export default PaymentModal;