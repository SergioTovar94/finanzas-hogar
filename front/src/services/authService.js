import { api } from './api';

export const authService = {
  registro: (name, email, password) => api.post('/users/register', { name, email, password }),
  login: (email, password) => api.post('/users/login', { email, password }),
};