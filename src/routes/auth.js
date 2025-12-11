import express from 'express';
import { UserModel } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create user
        const user = await UserModel.create({ name, email, password });
        const token = generateToken(user.id);

        res.status(201).json({
            token,
            user: UserModel.sanitize(user),
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await UserModel.comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            token,
            user: UserModel.sanitize(user),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user
router.get('/me', authMiddleware, (req, res) => {
    try {
        const user = UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: UserModel.sanitize(user) });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
