import React, { useState } from 'react';
import './Register.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const registrationData = { name: username, password, email };

    fetch('http://localhost:5001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); 
          onRegister(registrationData);  
        } else {
          setError(data.error || 'Something went wrong');  
        }
      })
      .catch((err) => {
        setError('An error occurred: ' + err.message);
      });

    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div className="Register">
      <h1 className="Header">Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="InputField"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="InputField"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="InputField"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="RegisterButton">Register</button>
      </form>
      {error && <p className="error">{error}</p>}  
    </div>
  );
}

export default Register;
