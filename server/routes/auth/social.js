// routes/auth/social.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Helper function to find or create user
const findOrCreateUser = async (profile, provider) => {
  try {
    // Cari user berdasarkan provider ID
    let user = await User.findOne({ [`auth.${provider}.id`]: profile.id });

    if (user) {
      // Update last login
      user.lastLoginAt = new Date();
      await user.save();
      return user;
    }

    // Cari user berdasarkan email (untuk link account)
    if (profile.emails && profile.emails[0]) {
      user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // Link account ke existing user
        user.auth[provider] = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0]?.value,
        };

        // Add auth method if not exists
        if (!user.authMethods.includes(provider)) {
          user.authMethods.push(provider);
        }

        user.lastLoginAt = new Date();
        await user.save();
        return user;
      }
    }

    // Create new user
    const newUser = new User({
      email: profile.emails?.[0]?.value,
      profile: {
        displayName: profile.displayName,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        avatar: profile.photos?.[0]?.value,
      },
      auth: {
        [provider]: {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          picture: profile.photos?.[0]?.value,
        },
      },
      authMethods: [provider],
      lastLoginAt: new Date(),
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error in findOrCreateUser:', error);
    throw error;
  }
};

// ======== GOOGLE AUTH ROUTES ========

// GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login?error=google_auth_failed',
  }),
  async (req, res) => {
    try {
      const user = req.user;

      // Set session
      req.session.user = {
        _id: user._id,
        displayName: user.profile.displayName,
        email: user.email || user.auth.google.email,
        avatar: user.profile.avatar,
        authMethods: user.authMethods,
      };

      // Generate JWT token
      const token = generateToken(user._id);

      // Redirect ke frontend dengan token
      const frontendURL = process.env.NODE_ENV === 'production' ? 'https://guyuchat.vercel.app' : 'http://localhost:3000';

      // Redirect dengan token di URL atau set cookie
      res.redirect(`${frontendURL}/auth/success?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect('/login?error=server_error');
    }
  }
);

// ======== FACEBOOK AUTH ROUTES ========

// GET /api/auth/facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
);

// GET /api/auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login?error=facebook_auth_failed',
  }),
  async (req, res) => {
    try {
      const user = req.user;

      // Set session
      req.session.user = {
        _id: user._id,
        displayName: user.profile.displayName,
        email: user.email || user.auth.facebook.email,
        avatar: user.profile.avatar,
        authMethods: user.authMethods,
      };

      // Generate JWT token
      const token = generateToken(user._id);

      // Redirect ke frontend dengan token
      const frontendURL = process.env.NODE_ENV === 'production' ? 'https://guyuchat.vercel.app' : 'http://localhost:3000';

      res.redirect(`${frontendURL}/auth/success?token=${token}`);
    } catch (error) {
      console.error('Facebook callback error:', error);
      res.redirect('/login?error=server_error');
    }
  }
);

// ======== ACCOUNT LINKING ROUTES ========

// POST /api/auth/link/google - Link Google to existing account
router.post(
  '/link/google',
  // Middleware to check if user is logged in
  (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Please login first' });
    }
    next();
  },
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// POST /api/auth/link/facebook - Link Facebook to existing account
router.post(
  '/link/facebook',
  (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Please login first' });
    }
    next();
  },
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
);

// ======== UNLINK ROUTES ========

// DELETE /api/auth/unlink/google
router.delete('/unlink/google', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has other auth methods
    if (user.authMethods.length <= 1) {
      return res.status(400).json({
        message: 'Cannot unlink. You need at least one authentication method.',
      });
    }

    // Remove Google auth
    user.auth.google = undefined;
    user.authMethods = user.authMethods.filter((method) => method !== 'google');

    await user.save();

    res.json({
      success: true,
      message: 'Google account unlinked successfully',
      authMethods: user.authMethods,
    });
  } catch (error) {
    console.error('Unlink Google error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/auth/unlink/facebook
router.delete('/unlink/facebook', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has other auth methods
    if (user.authMethods.length <= 1) {
      return res.status(400).json({
        message: 'Cannot unlink. You need at least one authentication method.',
      });
    }

    // Remove Facebook auth
    user.auth.facebook = undefined;
    user.authMethods = user.authMethods.filter((method) => method !== 'facebook');

    await user.save();

    res.json({
      success: true,
      message: 'Facebook account unlinked successfully',
      authMethods: user.authMethods,
    });
  } catch (error) {
    console.error('Unlink Facebook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
