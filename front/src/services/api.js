const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error en la petición');
  return data;
}

export const api = {
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};