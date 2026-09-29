/**
 * Admin Authentication Middleware
 * Protects administrative routes (create, update, delete)
 * Requires `x-admin-key` header matching process.env.ADMIN_KEY
 */

const getAdminKey = () => process.env.ADMIN_KEY || 'TrendAI@Admin2026';

const requireAdmin = (req, res, next) => {
  const adminKey = getAdminKey();

  // Extract from x-admin-key or Authorization Bearer header
  const providedKey =
    req.headers['x-admin-key'] ||
    (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
      ? req.headers['authorization'].slice(7)
      : null);

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin authentication key is required in x-admin-key header',
    });
  }

  if (providedKey !== adminKey) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid admin authentication key',
    });
  }

  next();
};

module.exports = {
  requireAdmin,
  getAdminKey,
};
