import {api} from './api';

export const accountService = {
  getAccounts: () => api.get('/accounts'),
  create: (data) => api.post('/accounts', data),
  delete: (id) => api.delete(`/accounts/${id}`)
};