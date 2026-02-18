# 🛍️ Micro Marketplace

A full-stack micro marketplace application with a Node.js/Express/MongoDB backend, React web app, and React Native (Expo) mobile app.

## 📁 Project Structure

```
micro-marketplace/
├── backend/          # Node.js + Express + MongoDB API
├── web/              # React + Vite web application
└── mobile/           # React Native (Expo) mobile app
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn
- Expo Go app (for mobile)

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` (already included):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/micro-marketplace
JWT_SECRET=micro_marketplace_super_secret_key_2024
JWT_EXPIRE=7d
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

API runs at: `http://localhost:5000`

---

### 2. Web App Setup

```bash
cd web
npm install
npm run dev
```

Web app runs at: `http://localhost:5173`

---

### 3. Mobile App Setup

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with **Expo Go** app on your phone.

> **Note:** For physical device, update `src/api/index.js` baseURL to your PC's local IP (e.g., `http://192.168.1.x:5000`)

---

## 🔑 Test Credentials

| Email | Password |
|-------|----------|
| user1@test.com | password123 |
| user2@test.com | password123 |

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /auth/register | No | Register user |
| POST | /auth/login | No | Login + JWT |
| GET | /auth/me | Yes | Current user |
| GET | /products | No | List products (search + pagination) |
| GET | /products/:id | No | Get product |
| POST | /products | Yes | Create product |
| PUT | /products/:id | Yes | Update product |
| DELETE | /products/:id | Yes | Delete product |
| GET | /favorites | Yes | Get favorites |
| POST | /favorites/:id | Yes | Add favorite |
| DELETE | /favorites/:id | Yes | Remove favorite |

### Query Parameters for GET /products
- `?q=keyword` — search by title or description
- `?page=1&limit=8` — pagination

---

## ✨ Features

### Backend
- JWT authentication with bcrypt password hashing
- Full CRUD for products
- Search + pagination
- Favorites per user
- Input validation + proper HTTP status codes
- CORS enabled
- Seed script (10 products, 2 users)

### Web App
- Login / Register
- Product listing with debounced search + pagination
- Product detail page
- Favorite / unfavorite with heart pulse animation
- Dark theme with glassmorphism UI
- Fully responsive

### Mobile App
- Login / Register screens
- Browse products with infinite scroll + search
- Product detail view
- Favorite / unfavorite
- Bottom tab navigation
- Dark themed UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express, MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Web | React, Vite, React Router, Axios |
| Mobile | React Native, Expo, React Navigation |
| Database | MongoDB |

---

## 📦 Deployment Guide

### Backend (Railway / Render)
1. Push to GitHub
2. Connect repo to Railway/Render
3. Set environment variables (MONGO_URI, JWT_SECRET, PORT)
4. Deploy

### Web (Vercel / Netlify)
1. Update `web/src/api/index.js` baseURL to deployed backend URL
2. Push to GitHub
3. Connect to Vercel/Netlify
4. Deploy

### Mobile (Expo EAS)
1. Update `mobile/src/api/index.js` baseURL to deployed backend URL
2. `npx eas build --platform android`
