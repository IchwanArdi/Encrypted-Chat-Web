const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Validation helper
const validateRegistrationInput = (data) => {
  const { firstName, lastName, email, password } = data;
  const errors = [];

  if (!firstName?.trim()) errors.push('First name is required');
  if (!lastName?.trim()) errors.push('Last name is required');
  if (!email?.trim()) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (password && password.length < 3) errors.push('Password must be at least 3 characters');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Check if email exists
const checkEmailExists = async (email) => {
  return await User.findOne({
    $or: [{ email: email }, { 'auth.local.email': email }],
  });
};

// Create user data structure
const createUserData = (userData, hashedPassword) => {
  const { firstName, lastName, email } = userData;

  return {
    email,
    profile: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      displayName: `${firstName.trim()} ${lastName.trim()}`,
      avatar: null,
    },
    auth: {
      local: {
        email,
        password: hashedPassword,
        isEmailVerified: false,
      },
    },
    authMethods: ['email'],
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
  };
};

// Format user response
const formatUserResponse = (user) => ({
  id: user._id,
  firstName: user.profile.firstName,
  lastName: user.profile.lastName,
  displayName: user.profile.displayName,
  email: user.email,
  isEmailVerified: user.auth.local.isEmailVerified,
});

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    const validation = validateRegistrationInput({ firstName, lastName, email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        message: validation.errors[0], // Return first error
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await checkEmailExists(normalizedEmail);
    if (existingUser) {
      return res.status(400).json({
        message: 'Email sudah terdaftar',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const userData = createUserData({ firstName, lastName, email: normalizedEmail }, hashedPassword);
    const newUser = new User(userData);
    await newUser.save();

    // Return success response
    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: formatUserResponse(newUser),
    });
  } catch (error) {
    console.error('Register error:', error);

    // Handle duplicate email error from MongoDB
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email sudah terdaftar',
      });
    }

    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({
        message: firstError.message,
      });
    }

    return res.status(500).json({
      message: 'Terjadi kesalahan server',
    });
  }
});

module.exports = router;
