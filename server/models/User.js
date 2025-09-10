const userSchema = new mongoose.Schema({
  // Core Identity
  id: { type: String, unique: true }, // internal ID
  email: { type: String, unique: true, sparse: true },

  // Profile
  profile: {
    firstName: String,
    lastName: String,
    displayName: String, // fallback name
    avatar: String,
    bio: String,
  },

  // Authentication Methods
  auth: {
    local: {
      email: String,
      password: String, // bcrypt hashed
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

  // Account Meta
  settings: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
  },

  // Security
  lastLoginAt: Date,
  lastLoginIP: String,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
