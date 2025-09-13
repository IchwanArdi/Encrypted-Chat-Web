const { encryptMessage, decryptMessage } = require('../utils/encryption');
const Message = require('../models/Message');
const User = require('../models/User');

// Map untuk tracking online users
const onlineUsers = new Map(); // userId -> socketId
const userSockets = new Map(); // socketId -> userId

// Helper function untuk mendapatkan display name dari user
const getUserDisplayName = (user) => {
  if (!user) return 'Deleted User';

  // Prioritas: displayName -> firstName lastName -> Google name -> Facebook name -> email
  if (user.profile?.displayName) {
    return user.profile.displayName;
  }

  if (user.profile?.firstName || user.profile?.lastName) {
    return `${user.profile.firstName || ''} ${user.profile.lastName || ''}`.trim();
  }

  if (user.auth?.google?.name) {
    return user.auth.google.name;
  }

  if (user.auth?.facebook?.name) {
    return user.auth.facebook.name;
  }

  // Fallback ke email
  return user.email || user.auth?.local?.email || user.auth?.google?.email || user.auth?.facebook?.email || 'Unknown User';
};

// Fungsi untuk broadcast online users ke semua client
const broadcastOnlineUsers = (io) => {
  const onlineUserIds = Array.from(onlineUsers.keys());
  io.emit('onlineUsers', onlineUserIds);
};

// Fungsi utama untuk mengatur komunikasi via WebSocket
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New WS Connection:', socket.id);

    // Menyimpan ID pengguna yang terkoneksi
    socket.on('userConnected', (userId) => {
      console.log(`User ${userId} connected with socket ${socket.id}`);

      // Simpan mapping user ke socket
      socket.userId = userId;
      onlineUsers.set(userId, socket.id);
      userSockets.set(socket.id, userId);

      // Join ke room pribadi berdasarkan userId
      socket.join(userId);

      // Broadcast updated online users list
      broadcastOnlineUsers(io);
    });

    // Join ke ruang obrolan publik & kirim pesan-pesan lama
    socket.on('joinPublicChat', async () => {
      socket.join('public');
      console.log(`Socket ${socket.id} joined public chat`);

      try {
        // Ambil hanya pesan public (isPrivate: false)
        const messages = await Message.find({
          isPrivate: false,
        })
          .sort({ createdAt: 1 })
          .populate('sender')
          .limit(50); // Batasi 50 pesan terakhir

        const decryptedMessages = messages.map((msg) => ({
          id: msg._id,
          text: decryptMessage(msg.text),
          sender: getUserDisplayName(msg.sender),
          senderId: msg.sender ? msg.sender._id : null,
          receiver: null, // Public message tidak ada receiver
          receiverId: null,
          createdAt: msg.createdAt,
          isPrivate: msg.isPrivate,
        }));

        socket.emit('previousMessages', decryptedMessages);
      } catch (err) {
        console.error('Error loading public messages:', err);
        socket.emit('error', { message: 'Failed to load public messages' });
      }
    });

    // Join ke ruang obrolan privat antara dua user
    socket.on('joinPrivateChat', async ({ otherUserId }) => {
      const userId = socket.userId;
      if (!userId) {
        socket.emit('error', { message: 'User not authenticated' });
        return;
      }

      const chatRoomId = [userId, otherUserId].sort().join('-');
      socket.join(chatRoomId);

      console.log(`Socket ${socket.id} joined private chat: ${chatRoomId}`);

      try {
        // Ambil hanya pesan private antara kedua user ini
        const messages = await Message.find({
          isPrivate: true,
          $or: [
            { sender: userId, receiver: otherUserId },
            { sender: otherUserId, receiver: userId },
          ],
        })
          .sort({ createdAt: 1 })
          .populate('sender')
          .populate('receiver')
          .limit(50); // Batasi 50 pesan terakhir

        const decryptedMessages = messages.map((msg) => ({
          id: msg._id,
          text: decryptMessage(msg.text),
          sender: getUserDisplayName(msg.sender),
          senderId: msg.sender._id,
          receiver: getUserDisplayName(msg.receiver),
          receiverId: msg.receiver._id,
          createdAt: msg.createdAt,
          isPrivate: true,
        }));

        socket.emit('previousPrivateMessages', {
          messages: decryptedMessages,
          otherUserId,
          chatRoomId,
        });
      } catch (err) {
        console.error('Error loading private messages:', err);
        socket.emit('error', { message: 'Failed to load private messages' });
      }
    });

    // Kirim pesan ke chat publik
    socket.on('publicMessage', async ({ text, userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user || !user.isActive) {
          socket.emit('error', { message: 'User not found or inactive' });
          return;
        }

        const encryptedText = encryptMessage(text);
        const message = new Message({
          text: encryptedText,
          sender: userId,
          isPrivate: false,
          receiver: null, // Pastikan receiver null untuk public message
        });
        await message.save();

        const displayName = getUserDisplayName(user);

        // Emit ke semua user di public room
        io.to('public').emit('message', {
          id: message._id,
          text,
          sender: displayName,
          senderId: user._id,
          receiver: null,
          receiverId: null,
          createdAt: message.createdAt,
          isPrivate: false,
        });

        console.log(`Public message sent by ${displayName}: ${text}`);
      } catch (err) {
        console.error('Error sending public message:', err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Kirim pesan privat ke user tertentu
    socket.on('privateMessage', async ({ text, senderId, receiverId }) => {
      try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !sender.isActive) {
          socket.emit('error', { message: 'Sender not found or inactive' });
          return;
        }

        if (!receiver || !receiver.isActive) {
          socket.emit('error', { message: 'Receiver not found or inactive' });
          return;
        }

        const encryptedText = encryptMessage(text);
        const message = new Message({
          text: encryptedText,
          sender: senderId,
          receiver: receiverId,
          isPrivate: true,
        });
        await message.save();

        const chatRoomId = [senderId, receiverId].sort().join('-');
        const senderDisplayName = getUserDisplayName(sender);
        const receiverDisplayName = getUserDisplayName(receiver);

        const messageData = {
          id: message._id,
          text,
          sender: senderDisplayName,
          senderId: sender._id,
          receiver: receiverDisplayName,
          receiverId: receiver._id,
          createdAt: message.createdAt,
          isPrivate: true,
        };

        // Emit ke chat room privat (kedua user yang terlibat dalam percakapan)
        io.to(chatRoomId).emit('privateMessage', messageData);

        // PERBAIKAN: Kirim notifikasi hanya ke receiver yang sedang TIDAK di chat room ini
        // dan pastikan receiver sedang online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          // Cek apakah receiver sedang tidak berada di chat room yang sama
          const receiverSocket = io.sockets.sockets.get(receiverSocketId);
          if (receiverSocket) {
            // Kirim notifikasi private message
            // Ini akan ditangkap oleh client untuk menambah unread counter
            receiverSocket.emit('newPrivateMessage', {
              from: senderDisplayName,
              fromId: senderId,
              message: text,
              chatRoomId,
            });
          }
        }

        console.log(`Private message sent from ${senderDisplayName} to ${receiverDisplayName}: ${text}`);
      } catch (err) {
        console.error('Error sending private message:', err);
        socket.emit('error', { message: 'Failed to send private message' });
      }
    });

    // Get user list untuk private chat
    socket.on('getUserList', async () => {
      try {
        const users = await User.find({
          isActive: true,
        }).select('_id profile auth email');

        const userList = users
          .filter((user) => user._id.toString() !== socket.userId) // Exclude current user
          .map((user) => ({
            id: user._id,
            displayName: getUserDisplayName(user),
            avatar: user.profile?.avatar,
            isOnline: onlineUsers.has(user._id.toString()),
          }));

        socket.emit('userList', userList);
      } catch (err) {
        console.error('Error getting user list:', err);
        socket.emit('error', { message: 'Failed to get user list' });
      }
    });

    // Event saat user disconnect
    socket.on('disconnect', () => {
      const userId = userSockets.get(socket.id);
      if (userId) {
        console.log(`User ${userId} disconnected (socket: ${socket.id})`);

        // Remove dari online users
        onlineUsers.delete(userId);
        userSockets.delete(socket.id);

        // Broadcast updated online users list
        broadcastOnlineUsers(io);
      } else {
        console.log('Unknown user disconnected:', socket.id);
      }
    });

    // Handle manual user status update
    socket.on('updateOnlineStatus', () => {
      broadcastOnlineUsers(io);
    });
  });
};
