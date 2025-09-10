const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },

  profile: {
    firstName: String,
    lastName: String,
    displayName: String,
    avatar: String,
  },

  auth: {
    local: {
      email: String,
      password: String, // hashed
      isEmailVerified: { type: Boolean, default: false },
    },

    google: {
      id: String,
      email: String,
      name: String,
      picture: String,
    },

    facebook: {
      id: String,
      email: String,
      name: String,
      picture: String,
    },
  },

  authMethods: [{ type: String, enum: ['email', 'google', 'facebook'] }],

  isActive: { type: Boolean, default: true },
  lastLoginAt: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
