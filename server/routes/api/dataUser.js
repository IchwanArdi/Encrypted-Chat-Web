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

      // Return complete user data with consistent structure
      res.json({
        user: {
          _id: user._id,
          // Keep the original structure for profile
          profile: {
            firstName: user.profile?.firstName,
            lastName: user.profile?.lastName,
            displayName: user.profile?.displayName,
            avatar: user.profile?.avatar,
          },
          // Keep the original structure for auth
          auth: {
            local: user.auth?.local,
            google: user.auth?.google,
            facebook: user.auth?.facebook,
          },
          // Keep original fields
          email: user.auth?.local?.email || user.auth?.google?.email || user.auth?.facebook?.email,
          authMethods: user.authMethods,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt,
          isActive: user.isActive,
          // Add computed displayName at root level for backward compatibility
          displayName:
            user.profile?.displayName ||
            `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim() ||
            user.auth?.google?.name ||
            user.auth?.facebook?.name ||
            user.auth?.local?.email ||
            user.auth?.google?.email ||
            user.auth?.facebook?.email ||
            'Unknown User',
        },
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
