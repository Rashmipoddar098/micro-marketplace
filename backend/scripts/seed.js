require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Product = require('../src/models/Product');

const products = [
    {
        title: 'Wireless Noise-Cancelling Headphones',
        price: 149.99,
        description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and remote workers.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    },
    {
        title: 'Mechanical Gaming Keyboard',
        price: 89.99,
        description: 'RGB backlit mechanical keyboard with tactile switches, anti-ghosting technology, and programmable macro keys. Elevate your gaming experience.',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500'
    },
    {
        title: 'Portable Bluetooth Speaker',
        price: 59.99,
        description: 'Waterproof portable speaker with 360° surround sound, 12-hour playtime, and built-in microphone. Take your music anywhere.',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
    },
    {
        title: 'Smart Fitness Watch',
        price: 199.99,
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 50+ workout modes. Compatible with iOS and Android.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
        title: 'USB-C Hub 7-in-1',
        price: 39.99,
        description: 'Versatile USB-C hub with HDMI 4K output, 3x USB 3.0 ports, SD card reader, and 100W PD charging. Essential for modern laptops.',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500'
    },
    {
        title: 'Ergonomic Office Chair',
        price: 299.99,
        description: 'Fully adjustable ergonomic chair with lumbar support, breathable mesh back, and 4D armrests. Designed for all-day comfort.',
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500'
    },
    {
        title: 'Wireless Charging Pad',
        price: 24.99,
        description: 'Fast 15W wireless charging pad compatible with all Qi-enabled devices. Slim design with LED indicator and anti-slip surface.',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
    },
    {
        title: '4K Webcam with Ring Light',
        price: 79.99,
        description: 'Professional 4K webcam with built-in ring light, noise-cancelling microphone, and auto-focus. Perfect for streaming and video calls.',
        image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500'
    },
    {
        title: 'Laptop Stand Adjustable',
        price: 34.99,
        description: 'Aluminum laptop stand with 6 adjustable height levels, foldable design, and heat dissipation vents. Compatible with 10-17 inch laptops.',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500'
    },
    {
        title: 'Smart LED Desk Lamp',
        price: 44.99,
        description: 'Touch-sensitive LED desk lamp with 5 color temperatures, 10 brightness levels, USB charging port, and memory function. Eye-care certified.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
    }
];

const users = [
    { name: 'Test User One', email: 'user1@test.com', password: 'password123' },
    { name: 'Test User Two', email: 'user2@test.com', password: 'password123' }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create users (password hashing handled by pre-save hook)
        const createdUsers = await User.create(users);
        console.log(`👥 Created ${createdUsers.length} users`);

        // Assign products to users alternately
        const productsWithOwner = products.map((p, i) => ({
            ...p,
            createdBy: createdUsers[i % 2]._id
        }));

        const createdProducts = await Product.create(productsWithOwner);
        console.log(`📦 Created ${createdProducts.length} products`);

        console.log('\n✅ Seeding complete!');
        console.log('\n📋 Test Credentials:');
        console.log('  Email: user1@test.com | Password: password123');
        console.log('  Email: user2@test.com | Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seed();
