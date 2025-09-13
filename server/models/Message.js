// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // null untuk public message
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index untuk performance query
MessageSchema.index({ sender: 1, receiver: 1, createdAt: 1 });
MessageSchema.index({ isPrivate: 1, createdAt: 1 });

module.exports = mongoose.model('Message', MessageSchema);
