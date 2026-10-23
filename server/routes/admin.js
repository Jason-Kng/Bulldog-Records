import express from 'express'
import db from '../database/database.js'
import { requireAdmin } from './adminAuth.js'

console.log('Admin router loaded');

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Admin router is working.' });
});

router.get('/dashboard/stats', requireAdmin, (req, res) => {
    try {
        const totalUsers = db.prepare(`
            SELECT COUNT(*) AS count FROM User
        `).get().count;

        const totalSellers = db.prepare(`
            SELECT COUNT(*) AS count FROM Seller
        `).get().count;

        const pendingSellers = db.prepare(`
            SELECT COUNT(*) AS count
            FROM Seller
            WHERE approvalStatus = 'pending'
        `).get().count;

        res.json({
            totalUsers,
            totalSellers,
            pendingSellers
        });
    } catch (error) {
        console.error('Failed to load admin dashboard statistics:', error);
        res.status(500).json({
            error: 'Failed to load dashboard statistics'
        });
    }
});

export default router;