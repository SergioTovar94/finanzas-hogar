import { api } from './api';

export const categoryService = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = queryParams ? `/categories?${queryParams}` : '/categories';
    return api.get(endpoint);
  },
  create: (data) => api.post('/categories', data),
  delete: (id) => api.delete(`/categories/${id}`)
};