const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// @route   GET /favorites
// @desc    Get user's favorite products
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');
        res.status(200).json({ success: true, data: user.favorites });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /favorites/:productId
// @desc    Add product to favorites
// @access  Private
router.post('/:productId', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);
        if (user.favorites.includes(req.params.productId)) {
            return res.status(400).json({ success: false, message: 'Product already in favorites' });
        }

        user.favorites.push(req.params.productId);
        await user.save();

        res.status(200).json({ success: true, message: 'Added to favorites', favorites: user.favorites });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /favorites/:productId
// @desc    Remove product from favorites
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const index = user.favorites.indexOf(req.params.productId);

        if (index === -1) {
            return res.status(400).json({ success: false, message: 'Product not in favorites' });
        }

        user.favorites.splice(index, 1);
        await user.save();

        res.status(200).json({ success: true, message: 'Removed from favorites', favorites: user.favorites });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
