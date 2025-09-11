const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Fix: Perbaiki kondisi validasi (sebelumnya ada syntax error)
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  if (password.length < 3) {
    return res.status(400).json({
      message: 'Password harus minimal 3 karakter',
    });
  }

  try {
    // Cek apakah email sudah terdaftar (baik di field utama atau di auth.local.email)
    const emailExists = await User.findOne({
      $or: [{ email: email }, { 'auth.local.email': email }],
    });

    if (emailExists) {
      return res.status(400).json({
        message: 'Email sudah terdaftar',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru sesuai dengan struktur model yang baru
    const userBaru = new User({
      email: email, // Email utama
      profile: {
        firstName: firstName,
        lastName: lastName,
        displayName: `${firstName} ${lastName}`, // Gabungkan nama depan dan belakang
        avatar: null, // Default avatar kosong
      },
      auth: {
        local: {
          email: email,
          password: hashedPassword,
          isEmailVerified: false,
        },
      },
      authMethods: ['email'], // Tambahkan metode auth email
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
    });

    await userBaru.save();

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: userBaru._id,
        firstName: userBaru.profile.firstName,
        lastName: userBaru.profile.lastName,
        displayName: userBaru.profile.displayName,
        email: userBaru.email,
        isEmailVerified: userBaru.auth.local.isEmailVerified,
      },
    });
  } catch (err) {
    console.error('Register error:', err);

    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Email sudah terdaftar',
      });
    }

    return res.status(500).json({
      message: 'Terjadi kesalahan server',
    });
  }
});

module.exports = router;
