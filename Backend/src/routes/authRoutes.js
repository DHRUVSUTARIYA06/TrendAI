const express = require('express');
const router = express.Router();
const { getAdminKey } = require('../middleware/auth');

// POST /api/auth/verify - Verify admin key
router.post('/verify', (req, res) => {
  const { adminKey } = req.body;
  const expectedKey = getAdminKey();

  if (!adminKey || adminKey.trim() !== expectedKey.trim()) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Admin Passcode',
    });
  }

  res.json({
    success: true,
    message: 'Admin authenticated successfully',
    role: 'admin',
  });
});

module.exports = router;
