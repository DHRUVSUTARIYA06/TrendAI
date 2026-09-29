import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://trend-ai-ten.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Attach Admin Key to every outgoing request
api.interceptors.request.use((config) => {
  const adminKey = localStorage.getItem('trendai_admin_key');
  if (adminKey) {
    config.headers['x-admin-key'] = adminKey;
  }
  return config;
});

// Admin Auth API
export const verifyAdminKey = (adminKey) =>
  api.post('/auth/verify', { adminKey });

// Categories API
export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Templates API
export const getTemplates = (params) => api.get('/templates', { params });
export const getTemplateById = (id) => api.get(`/templates/${id}`);
export const createTemplate = (formData) =>
  api.post('/templates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateTemplate = (id, formData) =>
  api.put(`/templates/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteTemplate = (id) => api.delete(`/templates/${id}`);
export const clearTestData = (mode = 'seed') =>
  api.post('/templates/clear-test-data', { mode });

export default api;
