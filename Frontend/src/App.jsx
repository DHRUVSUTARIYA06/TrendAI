import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import TemplateGrid from './components/TemplateGrid';
import TemplateModal from './components/TemplateModal';
import CategoryModal from './components/CategoryModal';
import PromptModal from './components/PromptModal';
import AdminLogin from './components/AdminLogin';
import { getCategories, getTemplates, clearTestData } from './api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem('trendai_admin_key'))
  );

  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Modals state
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [viewingPromptTemplate, setViewingPromptTemplate] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, tplRes] = await Promise.all([
        getCategories(),
        getTemplates({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          search: searchQuery || undefined,
        }),
      ]);

      if (catRes.data?.data) {
        setCategories(catRes.data.data);
      }
      if (tplRes.data?.data) {
        setTemplates(tplRes.data.data);
      }
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to load data:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, selectedCategory, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingTemplate(null);
    setIsTemplateModalOpen(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setIsTemplateModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('trendai_admin_key');
    setIsAuthenticated(false);
  };

  const handleClearTestData = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to clean test / demo templates from MongoDB Atlas? Templates you uploaded will be preserved.'
    );
    if (!confirmed) return;

    try {
      const res = await clearTestData('seed');
      alert(res.data.message || 'Test data removed successfully!');
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove test data.');
    }
  };

  // If not authenticated, render Admin Access Gate
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        onOpenTemplateModal={handleOpenCreateModal}
        onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
        isConnected={isConnected}
        onClearTestData={handleClearTestData}
        onLogout={handleLogout}
      />

      <main style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '32px 24px', flex: 1 }}>
        <StatsCards templates={templates} categories={categories} />

        <TemplateGrid
          templates={templates}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEditTemplate={handleEditTemplate}
          onViewPrompt={(tpl) => setViewingPromptTemplate(tpl)}
          onTemplatesUpdated={fetchData}
        />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '24px',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-muted)'
      }}>
        TrendAI Admin Studio • Protected Admin Portal • MongoDB Atlas Connected
      </footer>

      {/* Modals */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        template={editingTemplate}
        categories={categories}
        onSaved={fetchData}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onCategoriesUpdated={fetchData}
      />

      <PromptModal
        isOpen={!!viewingPromptTemplate}
        onClose={() => setViewingPromptTemplate(null)}
        template={viewingPromptTemplate}
      />
    </div>
  );
}
