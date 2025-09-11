const express = require('express');
const router = express.Router();

// GET /api/auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;