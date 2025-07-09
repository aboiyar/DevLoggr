import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Login from '../auth/Login';

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const result = await login(formData);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <Login onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
