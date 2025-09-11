// app.js - Updated
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
app.use(express.urlencoded({ extended: true })); // Untuk form data

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
app.use('/api/auth', require('./routes/auth/social')); // Add social routes
app.use('/api/auth', require('./routes/auth/logout'));

// Route Untuk mendapatkan data user yang sudah login
app.use('/api/data', require('./routes/api/dataUser'));

// app.use('/api/auth', require('./routes/auth/register'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Export untuk Vercel serverless
module.exports.default = app;
