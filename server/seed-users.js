// FILE: seed-users.js
// Script untuk membuat dummy users untuk testing

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import User model - SESUAIKAN PATH INI dengan lokasi model User Anda
// Contoh: jika model ada di ./models/User.js
const User = require('./models/User'); // <- UBAH PATH INI

// Connect ke MongoDB - SESUAIKAN CONNECTION STRING
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fungsi untuk membuat dummy users
async function seedUsers() {
  try {
    // Hapus semua user yang ada (opsional, hati-hati di production!)
    // await User.deleteMany({});
    // console.log('Existing users deleted');

    // Hash password
    const hashedPassword = await bcrypt.hash('testpassword123', 10);

    // Data dummy users
    const dummyUsers = [
      {
        email: 'test@example.com',
        profile: {
          firstName: 'Test',
          lastName: 'User',
          displayName: 'Test User',
          avatar: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=TU',
        },
        auth: {
          local: {
            email: 'test@example.com',
            password: hashedPassword,
            isEmailVerified: true,
          },
          google: {
            id: null,
            email: null,
            name: null,
            picture: null,
          },
          facebook: {
            id: null,
            email: null,
            name: null,
            picture: null,
          },
        },
        authMethods: ['email'],
        isActive: true,
        lastLoginAt: new Date(),
        createdAt: new Date(),
      },
      {
        email: 'john@example.com',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          displayName: 'John Doe',
          avatar: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=JD',
        },
        auth: {
          local: {
            email: 'john@example.com',
            password: await bcrypt.hash('password123', 10),
            isEmailVerified: true,
          },
          google: {},
          facebook: {},
        },
        authMethods: ['email'],
        isActive: true,
        lastLoginAt: new Date(),
        createdAt: new Date(),
      },
    ];

    // Insert dummy users
    const savedUsers = await User.insertMany(dummyUsers);
    console.log('✅ Dummy users created successfully!');
    console.log('📧 Login credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: testpassword123');
    console.log('   ---');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');

    console.log(`\n📊 Total users created: ${savedUsers.length}`);
  } catch (error) {
    console.error('❌ Error creating dummy users:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Jalankan script
seedUsers();
