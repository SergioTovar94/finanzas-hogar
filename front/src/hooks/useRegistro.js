// front/src/hooks/useRegistro.js
import { useState } from 'react';
import { usersService } from '../services/usersService';
import { useNavigate } from 'react-router-dom';

export const useRegistro = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registro = async (name, email, password) => {
    setError('');
    setIsLoading(true);
    try {
      const data = await usersService.registro(name, email, password);
      if (data.token) usersService.saveToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { registro, error, isLoading };
};