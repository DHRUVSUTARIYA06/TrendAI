import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { verifyAdminKey } from '../api';

export default function AdminLogin({ onLoginSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the admin passcode');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyAdminKey(passcode.trim());
      localStorage.setItem('trendai_admin_key', passcode.trim());
      onLoginSuccess(passcode.trim());
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid admin passcode. Access denied.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card">
        <div className="login-badge">
          <ShieldCheck size={16} />
          <span>Restricted Access</span>
        </div>

        <div className="login-icon-wrap">
          <Lock size={32} />
        </div>

        <h2>TrendAI Admin Studio</h2>
        <p className="login-subtitle">
          Enter the secure admin passcode to manage templates, categories, and AI prompts.
        </p>

        {error && <div className="login-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <KeyRound size={18} className="input-icon" />
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
          </div>

          <button type="submit" disabled={loading} className="login-submit-btn">
            {loading ? (
              <span className="login-spinner" />
            ) : (
              <>
                <span>Unlock Studio</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer-hint">
          <Sparkles size={14} />
          <span>Secured with Header Authentication</span>
        </div>
      </div>
    </div>
  );
}
