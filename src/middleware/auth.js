import { verifyToken } from '../utils/jwt.js';

export function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
}
