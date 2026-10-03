import { useState, useEffect } from 'react';

const SIDEBAR_STORAGE_KEY = 'promptoo_admin_sidebar_collapsed';

export const useSidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored !== null) return JSON.parse(stored);
      // Default to collapsed on mid-sized screens
      return window.innerWidth < 1200 && window.innerWidth >= 768;
    } catch {
      return false;
    }
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(collapsed));
    } catch {
      // Ignore storage errors in private browsing
    }
  }, [collapsed]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
      } else if (window.innerWidth < 1100 && !collapsed) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed((prev) => !prev);
  const toggleMobileOpen = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return {
    collapsed,
    mobileOpen,
    toggleSidebar,
    toggleMobileOpen,
    closeMobile
  };
};
