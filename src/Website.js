import React, { useState, useEffect } from 'react';
import './Website.css';

function Website({ products, handleSubmit, name, setName, feedback, setFeedback, onCheckout }) {
  const [quantities, setQuantities] = useState({
    milk: 0,
    cereal: 0,
    eggs: 0,
    meat: 0,
    chicken: 0,
    peanutbutter: 0,
    chocolate: 0,
    chips: 0,
  });
  const [showQuantity, setShowQuantity] = useState({
    milk: false,
    cereal: false,
    eggs: false,
    meat: false,
    chicken: false,
    peanutbutter: false,
    chocolate: false,
    chips: false,
  });

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

  useEffect(() => {
    if (!products.length) {
      fetch('http://localhost:5001/api/products')
        .then((response) => response.json())
        .then((data) => products(data))
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [products]);

  const handleQuantityChange = (product, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[product] + change;
      if (newQuantity >= 0) {
        return { ...prevQuantities, [product]: newQuantity };
      }
      return prevQuantities;
    });
  };

  const toggleQuantityBar = (product) => {
    setShowQuantity((prev) => ({
      ...prev,
      [product]: !prev[product],
    }));
  };

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(quantities));
    onCheckout();
  };

  return (
    <div className="Website">
      <h1 className="PageTitle">Welcome to Our Shop!</h1>

      <div id="product-list">
        <h2>Grocery Store</h2>
        <p>Buy your groceries from our store!</p>

    
        <div className="product-item">
          <h3 id="product1">Milk - ${prices.milk.toFixed(2)}</h3>
          <img src="https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg" alt="Milk" width="200" />
          <button onClick={() => toggleQuantityBar('milk')}>Buy</button>
          {showQuantity.milk && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('milk', -1)}>-</button>
              <input type="number" value={quantities.milk} readOnly min="0" />
              <button onClick={() => handleQuantityChange('milk', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product2">Cereal - ${prices.cereal.toFixed(2)}</h3>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Z9PipZBkXBxBi8O0zFO5WfwyDrZgHtLvJA&s" alt="Cereal" width="200" />
          <button onClick={() => toggleQuantityBar('cereal')}>Buy</button>
          {showQuantity.cereal && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('cereal', -1)}>-</button>
              <input type="number" value={quantities.cereal} readOnly min="0" />
              <button onClick={() => handleQuantityChange('cereal', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product3">Eggs - ${prices.eggs.toFixed(2)}</h3>
          <img src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/health-benefits-of-eggs-1296x728-feature.jpg?w=1155&h=1528" alt="Eggs" width="200" />
          <button onClick={() => toggleQuantityBar('eggs')}>Buy</button>
          {showQuantity.eggs && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('eggs', -1)}>-</button>
              <input type="number" value={quantities.eggs} readOnly min="0" />
              <button onClick={() => handleQuantityChange('eggs', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product4">Meat - ${prices.meat.toFixed(2)}</h3>
          <img src="https://images.inc.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg" alt="Meat" width="200" />
          <button onClick={() => toggleQuantityBar('meat')}>Buy</button>
          {showQuantity.meat && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('meat', -1)}>-</button>
              <input type="number" value={quantities.meat} readOnly min="0" />
              <button onClick={() => handleQuantityChange('meat', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product5">Chicken - ${prices.chicken.toFixed(2)}</h3>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_4318,h_4318,c_limit/RoastChicken_RECIPE_080420_37993.jpg" alt="Chicken" width="200" />
          <button onClick={() => toggleQuantityBar('chicken')}>Buy</button>
          {showQuantity.chicken && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('chicken', -1)}>-</button>
              <input type="number" value={quantities.chicken} readOnly min="0" />
              <button onClick={() => handleQuantityChange('chicken', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product6">PeanutButter - ${prices.peanutbutter.toFixed(2)}</h3>
          <img src="https://i5.walmartimages.com/seo/Jif-Creamy-Peanut-Butter-16-Ounce-Jar_2eab0f67-0308-46a5-bc5b-3ef79e3f8f17.03b75c30bf72f0054e05d7269be9d9ee.jpeg" alt="Peanut Butter" width="200" />
          <button onClick={() => toggleQuantityBar('peanutbutter')}>Buy</button>
          {showQuantity.peanutbutter && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('peanutbutter', -1)}>-</button>
              <input type="number" value={quantities.peanutbutter} readOnly min="0" />
              <button onClick={() => handleQuantityChange('peanutbutter', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product7">Chocolate - ${prices.chocolate.toFixed(2)}</h3>
          <img src="https://m.media-amazon.com/images/I/61W5LYC6kiL._SL1280_.jpg" alt="Chocolate" width="200" />
          <button onClick={() => toggleQuantityBar('chocolate')}>Buy</button>
          {showQuantity.chocolate && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('chocolate', -1)}>-</button>
              <input type="number" value={quantities.chocolate} readOnly min="0" />
              <button onClick={() => handleQuantityChange('chocolate', 1)}>+</button>
            </div>
          )}
        </div>

        <div className="product-item">
          <h3 id="product8">Chips - ${prices.chips.toFixed(2)}</h3>
          <img src="https://i5.walmartimages.com/seo/Lay-s-Potato-Chips-Cheddar-Sour-Cream-7-75-Oz_8a71fcba-e670-4b5c-9120-8b162d739de3_1.39861ccb364e931a9b4411d1e96484c5.jpeg" alt="Chips" width="200" />
          <button onClick={() => toggleQuantityBar('chips')}>Buy</button>
          {showQuantity.chips && (
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange('chips', -1)}>-</button>
              <input type="number" value={quantities.chips} readOnly min="0" />
              <button onClick={() => handleQuantityChange('chips', 1)}>+</button>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleCheckout} className="checkout-button">
        Go to Checkout
      </button>

      <footer id="footer">
        <p>Contact us for delivery: 012288</p>
      </footer>
    </div>
  );
}

export default Website;
