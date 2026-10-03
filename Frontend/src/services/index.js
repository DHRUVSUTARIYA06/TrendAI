import { templateRepository } from '../repositories/templateRepository';
import { categoryRepository } from '../repositories/categoryRepository';
import { userRepository } from '../repositories/userRepository';
import { dashboardRepository } from '../repositories/dashboardRepository';

export const templateService = {
  getTemplates: (params) => templateRepository.getAll(params),
  getTemplateById: (id) => templateRepository.getById(id),
  createTemplate: (data) => templateRepository.create(data),
  deleteTemplate: (id) => templateRepository.delete(id)
};

export const categoryService = {
  getCategories: () => categoryRepository.getAll(),
  createCategory: (data) => categoryRepository.create(data),
  deleteCategory: (id) => categoryRepository.delete(id)
};

export const userService = {
  getUsers: () => userRepository.getAll(),
  getUserStats: () => userRepository.getStats()
};

export const dashboardService = {
  getMetrics: () => dashboardRepository.getOverviewMetrics(),
  getActivity: () => dashboardRepository.getRecentActivity(),
  getTopTemplates: () => dashboardRepository.getTopTemplates()
};
