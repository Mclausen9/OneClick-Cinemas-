import React, { useState } from 'react';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  // Validate card number format: 1234 5678 9012 3456
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16); // Remove non-digits and limit to 16 digits
    setCardNumber(value.replace(/(\d{4})(?=\d)/g, '$1 ')); // Format as 1234 5678 9012 3456
  };

  // Validate expiration date format: MM/YY
  const handleExpirationDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4); // Allow only 4 digits (MMYY)
    setExpirationDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!cardNumber || !expirationDate || !cvv) {
      setError('Please fill in all fields.');
      return;
    }

    // Expiration date check: MM/YY format and future date
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear() % 100;
    const [inputMonth, inputYear] = expirationDate.split('').map(Number);

    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      setError('Expiration date cannot be in the past.');
      return;
    }

    // Save to localStorage
    localStorage.setItem('creditCardInfo', JSON.stringify({ cardNumber, expirationDate, cvv }));

    alert('Credit card details saved successfully!');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setError('');
  };

  return (
    <div className="credit-card-form">
      <h2>Enter Credit Card Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19" // 16 digits + 3 spaces
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            placeholder="CVV"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Save Card</button>
      </form>
    </div>
  );
};

export default CreditCardForm;
