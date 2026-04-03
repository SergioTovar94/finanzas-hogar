// front/src/services/authService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

export const usersService = {
  async registro(name, email, password) {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error en registro');
    return data;
  },

  saveToken(token) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
  },
};