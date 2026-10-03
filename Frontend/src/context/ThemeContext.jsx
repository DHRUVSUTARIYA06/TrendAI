import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'promptoo-admin-theme';
const SETTINGS_STORAGE_KEY = 'promptoo_admin_settings_v1';

export const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => {}
});

function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'system';
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system') {
      return savedTheme;
    }

    // Preserve existing settings preference if previously configured
    const settingsStr = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (settingsStr) {
      const parsed = JSON.parse(settingsStr);
      if (parsed?.appearance?.theme) {
        const legacyTheme = parsed.appearance.theme;
        if (legacyTheme === 'dark' || legacyTheme === 'light' || legacyTheme === 'system') {
          return legacyTheme;
        }
      }
    }
  } catch {
    // Fallback to default
  }
  return 'system';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Compute effective resolved theme
  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  // Apply theme to DOM
  const applyThemeToDOM = useCallback((activeResolved) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', activeResolved);
      document.documentElement.style.colorScheme = activeResolved;
    }
  }, []);

  // Set theme handler with validation and persistence
  const setTheme = useCallback((newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light' && newTheme !== 'system') {
      return;
    }

    setThemeState(newTheme);

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);

      // Keep settings repository in sync
      const settingsStr = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (settingsStr) {
        const parsed = JSON.parse(settingsStr);
        if (parsed?.appearance) {
          parsed.appearance.theme = newTheme;
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(parsed));
        }
      }
    } catch {
      // Storage failure safety
    }
  }, []);

  // Listen to OS prefers-color-scheme changes when in system mode
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial match
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Update DOM when resolvedTheme changes
  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme, applyThemeToDOM]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme
  }), [theme, resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
