const app = require('./app');

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${DB.substring(0, 20)}...`);
});

// Export untuk Vercel (serverless)
module.exports = app;
