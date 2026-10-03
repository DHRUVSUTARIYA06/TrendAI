import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

// Admin Pages
import DashboardPage from '../pages/DashboardPage';
import TemplatesPage from '../pages/TemplatesPage';
import TemplateFormPage from '../pages/TemplateFormPage';
import CategoriesPage from '../pages/CategoriesPage';
import CategoryFormPage from '../pages/CategoryFormPage';
import UsersPage from '../pages/UsersPage';
import UserDetailPage from '../pages/UserDetailPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import LikesPage from '../pages/LikesPage';
import NotificationsPage from '../pages/NotificationsPage';
import NotificationFormPage from '../pages/NotificationFormPage';
import NotificationDetailPage from '../pages/NotificationDetailPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import ReportsPage from '../pages/ReportsPage';
import AdminsPage from '../pages/AdminsPage';
import AdminFormPage from '../pages/AdminFormPage';
import AdminDetailPage from '../pages/AdminDetailPage';
import SettingsPage from '../pages/SettingsPage';

export default function AppRoutes({ onLogout }) {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout onLogout={onLogout} />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="templates/new" element={<TemplateFormPage />} />
        <Route path="templates/:id/edit" element={<TemplateFormPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/new" element={<CategoryFormPage />} />
        <Route path="categories/:id/edit" element={<CategoryFormPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="likes" element={<LikesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="notifications/new" element={<NotificationFormPage />} />
        <Route path="notifications/:id" element={<NotificationDetailPage />} />
        <Route path="notifications/:id/edit" element={<NotificationFormPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="admins" element={<AdminsPage />} />
        <Route path="admins/new" element={<AdminFormPage />} />
        <Route path="admins/:id" element={<AdminDetailPage />} />
        <Route path="admins/:id/edit" element={<AdminFormPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}
