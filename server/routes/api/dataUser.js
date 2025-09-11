const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// GET /api/data/user
router.get('/user', async (req, res) => {
  try {
    if (req.session.user) {
      // Fetch complete user data from database
      const user = await User.findById(req.session.user._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return complete user data
      res.json({
        user: {
          _id: user._id,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          displayName: user.profile.displayName || `${user.profile.firstName} ${user.profile.lastName}`.trim(),
          email: user.auth.local.email,
          avatar: user.profile.avatar,
          authMethods: user.authMethods,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;