/**
 * Promptoo Admin — Authentication Service
 *
 * Encapsulates authentication logic, session validation, and passcode checks.
 * In current pre-Supabase development, provides local passcode verification and token persistence.
 * Ready for future Supabase Auth integration (`supabase.auth.signInWithPassword`).
 */

const STORAGE_KEY = 'promptoo_admin_passcode';
const LEGACY_STORAGE_KEY = 'trendai_admin_key';

// Default master admin passcode fallback for development
const DEFAULT_ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'promptoo2026';

export const authService = {
  /**
   * Verifies the administrator passcode
   * @param {string} passcode
   * @returns {Promise<{ success: boolean, user: object }>}
   */
  verifyAdminKey: async (passcode) => {
    // Artificial small delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!passcode || !passcode.trim()) {
      throw new Error('Please enter an admin passcode.');
    }

    const trimmed = passcode.trim();

    // Accept configured passcode, default passcode, or master key
    const isValid =
      trimmed === DEFAULT_ADMIN_PASSCODE ||
      trimmed === 'promptoo_master' ||
      trimmed === 'admin' ||
      trimmed === (import.meta.env.VITE_ADMIN_KEY || '');

    if (!isValid) {
      const err = new Error('Invalid admin passcode. Access denied.');
      err.response = { data: { message: 'Invalid admin passcode. Access denied.' } };
      throw err;
    }

    const authSession = {
      id: 'ADM-SUPER-01',
      displayName: 'Dhruv Sutariya',
      email: 'dhruv.sutariya@promptoo.ai',
      role: 'super_admin',
      authenticatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, trimmed);
    localStorage.setItem(LEGACY_STORAGE_KEY, trimmed);

    return {
      success: true,
      user: authSession
    };
  },

  /**
   * Checks if an admin session is currently authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return Boolean(
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem(LEGACY_STORAGE_KEY)
    );
  },

  /**
   * Logs out the current admin
   */
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
};

export const verifyAdminKey = authService.verifyAdminKey;
export default authService;
