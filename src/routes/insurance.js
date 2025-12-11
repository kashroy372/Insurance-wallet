import express from 'express';
import { InsuranceModel } from '../models/Insurance.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all user's insurance policies
router.get('/', (req, res) => {
    try {
        const insurances = InsuranceModel.findByUserId(req.userId);
        res.json(insurances);
    } catch (error) {
        console.error('Get insurances error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get specific insurance policy
router.get('/:id', (req, res) => {
    try {
        const insurance = InsuranceModel.findById(req.params.id);

        if (!insurance) {
            return res.status(404).json({ message: 'Insurance policy not found' });
        }

        // Check if insurance belongs to user
        if (insurance.userId !== req.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(insurance);
    } catch (error) {
        console.error('Get insurance error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new insurance policy
router.post('/', (req, res) => {
    try {
        const insuranceData = {
            ...req.body,
            userId: req.userId,
        };

        const insurance = InsuranceModel.create(insuranceData);
        res.status(201).json(insurance);
    } catch (error) {
        console.error('Create insurance error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update insurance policy
router.put('/:id', (req, res) => {
    try {
        const insurance = InsuranceModel.findById(req.params.id);

        if (!insurance) {
            return res.status(404).json({ message: 'Insurance policy not found' });
        }

        // Check if insurance belongs to user
        if (insurance.userId !== req.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updatedInsurance = InsuranceModel.update(req.params.id, req.body);
        res.json(updatedInsurance);
    } catch (error) {
        console.error('Update insurance error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete insurance policy
router.delete('/:id', (req, res) => {
    try {
        const insurance = InsuranceModel.findById(req.params.id);

        if (!insurance) {
            return res.status(404).json({ message: 'Insurance policy not found' });
        }

        // Check if insurance belongs to user
        if (insurance.userId !== req.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        InsuranceModel.delete(req.params.id);
        res.json({ message: 'Insurance policy deleted successfully' });
    } catch (error) {
        console.error('Delete insurance error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
