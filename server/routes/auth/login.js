const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with local auth
    const user = await User.findOne({
      'auth.local.email': email,
      isActive: true,
    });

    if (!user || !user.auth.local.password) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.auth.local.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Set session
    req.session.user = {
      _id: user._id,
      displayName: user.profile.displayName || `${user.profile.firstName} ${user.profile.lastName}`.trim(),
      email: user.auth.local.email,
      avatar: user.profile.avatar,
      authMethods: user.authMethods,
    };

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        displayName: req.session.user.displayName,
        email: user.auth.local.email,
        avatar: user.profile.avatar,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
