import React, { useState } from 'react';
import './Loginpage.css';
import Register from './Register';

function Loginpage({ onLogin }) {
  const [showRegister, setShowRegister] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const username = e.target.username.value;
    const password = e.target.password.value;

    const loginData = { username, password };

    fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          onLogin();  
        } else {
          setLoginError(data.error || 'Invalid credentials');
        }
      })
      .catch((err) => {
        setLoginError('An error occurred: ' + err.message);
      });
  };

  if (showRegister) {
    return <Register onRegister={(data) => console.log('Registered:', data)} />;
  }

  return (
    <div className="Loginpage">
      <h1 className="Header">Please Login or Signup</h1>
      <form onSubmit={handleSubmit}>
        <label> Username </label>
        <input
          name="username"
          className="Credentials"
          type="text"
          placeholder="Enter your username"
          required
        />
        <label> Password </label>
        <input
          name="password"
          className="Credentials2"
          type="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="LoginButton">Login</button>
      </form>
      {loginError && <p className="error">{loginError}</p>} 
      <button className="RegisterButton" onClick={() => setShowRegister(true)}>
        Register
      </button>
    </div>
  );
}

export default Loginpage;
