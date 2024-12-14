import React, { useEffect, useState } from 'react';
import './App.css';
import Loginpage from './Loginpage.js';
import Website from './Website.js';
import Checkout from './Checkout.js';
import Payment from './Payment.js'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); 

  const [products, setProducts] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('website');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        currentPage === 'website' ? (
          <Website
            products={products}
            onCheckout={() => navigateTo('checkout')} 
          />
        ) : currentPage === 'checkout' ? (
          <Checkout
            onBack={() => navigateTo('website')} 
            onPayment={() => navigateTo('payment')} 
          />
        ) : currentPage === 'payment' ? (
          <Payment onBack={() => navigateTo('checkout')} /> 
        ) : null
      ) : (
        <Loginpage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
