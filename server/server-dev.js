const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://guyuchat.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Import dan jalankan socket handler
const socketHandler = require('./socket/index'); // Path ke file socket handler
socketHandler(io);

server.listen(PORT, () => {
  console.log(`Development Server with Socket.IO is running on port ${PORT}`);
  console.log(`MongoDB URI: ${DB.substring(0, 20)}...`);
  console.log('Socket.io is ready for connections');
});

// Export server untuk development
module.exports = server;
