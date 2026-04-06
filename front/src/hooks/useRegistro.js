import { useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useRegistro = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registro = async (name, email, password) => {
    setError('');
    setIsLoading(true);
    try {
      await authService.registro(name, email, password); // ← solo llamar, sin token
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { registro, error, isLoading };
};