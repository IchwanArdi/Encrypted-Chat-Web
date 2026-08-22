# Guyu Chat — Zero-Knowledge E2EE Web Messenger

Guyu Chat adalah platform perpesanan web real-time yang dirancang dengan arsitektur **Zero-Knowledge** dan enkripsi **End-to-End (E2EE)**. Seluruh percakapan dienkripsi langsung di tingkat peramban (client-side) menggunakan Web Crypto API sebelum dikirim ke peladen.

---

## Technical Overview

- **Zero-Knowledge Architecture:** Peladen (server) hanya bertindak sebagai perantara transit paket biner terenkripsi (*ciphertext*). Peladen tidak pernah menyimpan, mengekstrak, atau memiliki kemampuan teknis untuk membaca teks obrolan (*plaintext*).
- **Client-Side Cryptography:** Menggunakan algoritma simetris `AES-256-GCM` untuk enkripsi isi pesan dan `ECDH (P-256)` untuk pertukaran kunci privat antar-perangkat.
- **Atelier Editorial UI System:** Antarmuka berbasis sistem desain Atelier OKLCH dengan tipografi Fraunces, IBM Plex Sans, dan JetBrains Mono.

---

## Tech Stack

### Frontend
- **Framework & Build Tool:** React 18, Vite
- **Routing & State:** React Router v6, Socket.IO Client
- **Design System:** Custom Atelier OKLCH Design Tokens, Vanilla CSS, Tailwind Utilities
- **Icons & Typography:** Lucide React, Google Fonts (Fraunces, IBM Plex Sans, JetBrains Mono)

### Backend
- **Runtime & Server:** Node.js, Express.js
- **Real-time Protocol:** Socket.IO (WebSocket / TLS)
- **Database & Auth:** MongoDB, Mongoose, Passport.js (Google & Facebook OAuth 2.0, JWT)

---

## Architecture Flow

```
[ Client A (Browser) ] ---> Enkripsi AES-256-GCM (Client-Side)
                                    │
                                 Ciphertext
                                    │
                                    ▼
                         [ Node.js Socket.IO Relay ]
                                    │ (Zero-Knowledge Relay)
                                 Ciphertext
                                    │
                                    ▼
[ Client B (Browser) ] <--- Dekripsi AES-256-GCM (Client-Side)
```

---

## Quick Start

### 1. Prerequisites
- Node.js >= 18.x
- MongoDB (Lokal atau MongoDB Atlas)

### 2. Clone & Install Dependencies

```bash
# Clone repository
git clone https://github.com/IchwanArdi/Encrypted-Chat-Web.git
cd Encrypted-Chat-Web

# Install dependencies frontend & backend
cd client && npm install
cd ../server && npm install
```

### 3. Environment Variables

Buat file `.env` di dalam direktori `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/guyu-chat
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173

# OAuth (Opsional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

Dan buat file `.env` di dalam direktori `client/`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Running Locally

```bash
# Terminal 1: Run Backend Server
cd server
npm run dev

# Terminal 2: Run Frontend Development Server
cd client
npm run dev
```

Akses aplikasi di `http://localhost:5173`.

---

## Production Build

```bash
cd client
npm run build
```

Hasil build statis akan tersimpan di `client/dist/`.

---

## License

Lisensi di bawah [MIT License](LICENSE).
