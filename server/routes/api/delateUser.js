// routes/api/deleteUser.js - FIXED VERSION
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// DELETE /api/data/delete-account
router.delete('/delete-account', verifyToken, async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.userId;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has local authentication and password is required
    const hasLocalAuth = user.auth && user.auth.local && user.auth.local.password;

    if (hasLocalAuth) {
      if (!password) {
        return res.status(400).json({
          message: 'Password diperlukan untuk menghapus akun',
        });
      }

      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare(password, user.auth.local.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password salah' });
      }
    }

    // Log deletion for compliance
    console.log(`User deletion requested: ${user.email} at ${new Date()}`);
    console.log(`User ID: ${userId}`);

    // Delete user data
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found during deletion' });
    }

    // Destroy session if exists
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
        }
      });
    }

    // Clear any cookies
    res.clearCookie('connect.sid');

    res.json({
      success: true,
      message: 'Akun dan semua data telah berhasil dihapus',
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// POST /api/data/request-deletion - For email-based deletion requests
router.post('/request-deletion', async (req, res) => {
  try {
    const { email, fullName, reason } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        message: 'Email dan nama lengkap diperlukan',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Format email tidak valid',
      });
    }

    // Find user by email (check multiple possible email fields)
    const user = await User.findOne({
      $or: [{ email: email }, { 'auth.local.email': email }, { 'auth.google.email': email }, { 'auth.facebook.email': email }],
    });

    if (!user) {
      // For security reasons, don't reveal whether email exists or not
      return res.json({
        success: true,
        message: 'Jika akun dengan email tersebut ditemukan, permintaan penghapusan akan diproses dalam 7-30 hari kerja.',
      });
    }

    // Log the deletion request
    console.log(`Data deletion request received:`, {
      email,
      fullName,
      reason: reason || 'No reason provided',
      userId: user._id,
      requestedAt: new Date(),
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection.remoteAddress,
    });

    // In a real app, you might want to:
    // 1. Send this to a queue for manual review
    // 2. Send confirmation email to user
    // 3. Store in a pending deletions table
    // 4. Set a flag on user account for pending deletion
    // 5. Send notification to admins

    res.json({
      success: true,
      message: 'Permintaan penghapusan data telah diterima. Kami akan memproses dalam 7-30 hari kerja dan mengirim konfirmasi ke email Anda.',
    });
  } catch (error) {
    console.error('Request deletion error:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// GET /api/data/download-data - Download user data (GDPR compliance)
router.get('/download-data', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Find user and exclude sensitive data
    const user = await User.findById(userId).select('-auth.local.password -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare user data for export
    const userData = {
      personalInfo: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        avatar: user.avatar,
      },
      accountInfo: {
        authMethods: user.authMethods || [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
      },
      profile: user.profile || {},
      preferences: user.preferences || {},
      // Add other non-sensitive data as needed
      exportInfo: {
        exportedAt: new Date().toISOString(),
        exportedBy: 'User request',
        dataFormat: 'JSON',
      },
    };

    // Set appropriate headers for file download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="my-guyuchat-data.json"');
    res.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(userData, null, 2)));

    res.json(userData);

    // Log the data export
    console.log(`User data exported: ${user.email} at ${new Date()}`);
  } catch (error) {
    console.error('Download data error:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;
