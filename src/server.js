import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import insuranceRoutes from './routes/insurance.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://frontend-ayg5abbvi-kash-roys-projects.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Insurance Wallet Backend is running',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to Insurance Wallet API',
        version: '1.0.0'
    });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Insurance routes
app.use('/api/insurance', insuranceRoutes);

// Example API endpoint (keep for backward compatibility)
app.get('/api/insurance-types', (req, res) => {
    res.json([
        { id: 1, name: 'Auto Insurance', icon: '🚗' },
        { id: 2, name: 'Home Insurance', icon: '🏠' },
        { id: 3, name: 'Life Insurance', icon: '❤️' },
        { id: 4, name: 'Health Insurance', icon: '🏥' }
    ]);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔌 API endpoint: http://localhost:${PORT}/api`);
    console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth/*`);
    console.log(`📋 Insurance endpoints: http://localhost:${PORT}/api/insurance/*`);
});
