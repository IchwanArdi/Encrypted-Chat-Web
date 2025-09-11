// app.js - Updated and Fixed
const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./config/passport'); // Import passport config

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://guyuchat.vercel.app'],
    credentials: true,
  })
);

app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/auth/login'));
app.use('/api/auth', require('./routes/auth/register'));
app.use('/api/auth', require('./routes/auth/social'));
app.use('/api/auth', require('./routes/auth/logout'));
app.use('/api/auth', require('./routes/auth/verify')); // ADD THIS LINE - Missing verify route

// Route Untuk mendapatkan data user yang sudah login
app.use('/api/data', require('./routes/api/dataUser'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Root route untuk testing
app.get('/', (req, res) => {
  res.json({
    message: 'Server is running!',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Export untuk Vercel serverless
module.exports = app;
