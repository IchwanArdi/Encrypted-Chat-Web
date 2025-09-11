const app = require('./app');

const PORT = process.env.PORT || 5000;

// Untuk development (local)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI?.substring(0, 20)}...`);
  });
}

// Export untuk Vercel (serverless)
module.exports = app;
