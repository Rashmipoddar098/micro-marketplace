# Backend – Micro Marketplace API

## Setup

```bash
npm install
npm run seed   # Seed 10 products + 2 users
npm run dev    # Start dev server (nodemon)
npm start      # Start production server
```

## Environment Variables (.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/micro-marketplace
JWT_SECRET=micro_marketplace_super_secret_key_2024
JWT_EXPIRE=7d
```

## Folder Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── User.js       # User schema (name, email, password, favorites[])
│   │   └── Product.js    # Product schema (title, price, description, image)
│   ├── routes/
│   │   ├── auth.js       # POST /auth/register, POST /auth/login, GET /auth/me
│   │   ├── products.js   # CRUD /products + search + pagination
│   │   └── favorites.js  # GET/POST/DELETE /favorites/:productId
│   ├── middleware/
│   │   └── auth.js       # JWT protect middleware
│   └── index.js          # Express app + MongoDB connection
└── scripts/
    └── seed.js           # Seed script
```

## Test Credentials

| Email | Password |
|-------|----------|
| user1@test.com | password123 |
| user2@test.com | password123 |
