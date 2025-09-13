// utils/encryption.js
const crypto = require('crypto');

// Menggunakan environment variable untuk encryption key
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
const IV_LENGTH = 16; // For AES, this is always 16

// Encrypt function
const encryptMessage = (text) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    return text; // Fallback: return original text if encryption fails
  }
};

// Decrypt function
const decryptMessage = (encryptedText) => {
  try {
    if (!encryptedText || typeof encryptedText !== 'string') {
      return encryptedText || '';
    }

    const textParts = encryptedText.split(':');
    if (textParts.length !== 2) {
      // If not in expected format, return as is (might be unencrypted)
      return encryptedText;
    }

    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedData = textParts.join(':');

    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText; // Fallback: return original text if decryption fails
  }
};

// Generate a random encryption key (untuk setup awal)
const generateEncryptionKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash function untuk password (jika diperlukan)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Verify hash
const verifyHash = (password, hash) => {
  return hashPassword(password) === hash;
};

module.exports = {
  encryptMessage,
  decryptMessage,
  generateEncryptionKey,
  hashPassword,
  verifyHash,
};
