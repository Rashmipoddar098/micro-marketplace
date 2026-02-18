# Web App – Micro Marketplace

## Setup

```bash
npm install
npm run dev
```

Runs at: `http://localhost:5173`

## Features
- Login / Register with JWT
- Product listing with debounced search + pagination
- Product detail page
- Favorite / unfavorite with heart pulse animation
- Dark glassmorphism UI, fully responsive

## Folder Structure

```
web/src/
├── api/index.js          # Axios client + all API calls
├── context/AuthContext.jsx
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── Pagination.jsx
└── pages/
    ├── Login.jsx
    ├── Register.jsx
    ├── Products.jsx
    ├── ProductDetail.jsx
    └── Favorites.jsx
```
