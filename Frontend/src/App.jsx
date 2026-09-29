import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import TemplateGrid from './components/TemplateGrid';
import TemplateModal from './components/TemplateModal';
import CategoryModal from './components/CategoryModal';
import PromptModal from './components/PromptModal';
import { getCategories, getTemplates } from './api';

export default function App() {
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
    fetchData();
  }, [selectedCategory, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingTemplate(null);
    setIsTemplateModalOpen(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setIsTemplateModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        onOpenTemplateModal={handleOpenCreateModal}
        onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
        isConnected={isConnected}
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
        TrendAI Admin Studio • Connected to MongoDB Atlas & Flutter Mobile App
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
