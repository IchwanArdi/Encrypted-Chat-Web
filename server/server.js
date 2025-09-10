const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URI;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${DB.substring(0, 20)}...`); // Print first 20 characters of the URI
});
