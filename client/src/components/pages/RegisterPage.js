import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Register from '../auth/Register';

const RegisterPage = () => {
  const { register } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const result = await register(formData);
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Register onSubmit={handleRegister} error={error} />
    </div>
  );
};

export default RegisterPage;
