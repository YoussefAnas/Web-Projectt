import React, { useState } from 'react';
import './Payment.css';

function Payment({ onBack }) { 
  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !paymentMethod) {
      alert('Please fill in all fields.');
      return;
    }

    const paymentDetails = {
      location,
      paymentMethod,
    };
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

    alert('Your order is out for delivery');

  };

  return (
    <div className="Payment">
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Enter your location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Choose your payment method:</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Visa"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            Visa
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            Cash on Delivery
          </label>
        </div>
        <button type="submit">Confirm Payment</button>
      </form>
      <button onClick={onBack}>Back to Checkout</button>
    </div>
  );
}

export default Payment;
