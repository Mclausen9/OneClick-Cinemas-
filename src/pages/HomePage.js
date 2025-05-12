// pages/HomePage.js
import React from 'react';
import { useAuth } from '../auth/AuthProvider';

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
