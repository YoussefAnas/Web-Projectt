import React, { useState, useEffect } from 'react';
import './Checkout.css';

const prices = {
  milk: 2.5,
  cereal: 3.0,
  eggs: 1.5,
  meat: 5.0,            
  chicken: 4.0,         
  peanutbutter: 2.2, 
  chocolate: 1.8,       
  chips: 1.2,           
};

function Checkout({ onBack, onPayment }) {
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
      const total = Object.keys(savedCart).reduce((sum, product) => {
        return sum + (savedCart[product] * (prices[product] || 0));
      }, 0);
      setTotalPrice(total.toFixed(2));
    }
  }, []); 

  const handleCheckout = () => {
    onPayment(); 
  };

  return (
    <div className="Checkout">
      <h1>Checkout</h1>
      <div>
        <h2>Your Cart</h2>
        <ul>
          {Object.keys(cart).map((product) =>
            cart[product] > 0 && (
              <li key={product}>
                {product}: {cart[product]}
              </li>
            )
          )}
        </ul>
        {Object.keys(cart).some((product) => cart[product] > 0) ? (
          <>
            <p><strong>Total Price: ${totalPrice}</strong></p>
            <button onClick={handleCheckout}>Proceed to Payment</button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <button onClick={onBack}>Back to Shop</button>
    </div>
  );
}

export default Checkout;
