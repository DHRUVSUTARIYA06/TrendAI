import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
});

export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

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

export default api;
