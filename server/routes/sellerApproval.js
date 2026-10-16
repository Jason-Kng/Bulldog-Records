import express from 'express';
import { requireAdmin } from './adminAuth.js';
import db from "../database/database.js"

const router = express.Router();

router.get('/sellers/pending', requireAdmin, (req, res) => {
    try {
        const sellers = db.prepare(`
            SELECT
                Seller.sellerID,
                Seller.userID,
                Seller.approvalStatus,
                User.name,
                User.email
            FROM Seller
            JOIN User ON Seller.userID = User.userID
            WHERE Seller.approvalStatus = 'pending'
            ORDER BY Seller.sellerID
        `).all();

        res.json(sellers);
    } catch (error) {
        console.error('Error retrieving pending sellers:', error);
        res.status(500).json({ error: 'Failed to retrieve pending sellers' });
    }
});

router.patch('/sellers/:sellerID/status', requireAdmin, (req, res) => {
    const { sellerID } = req.params;
    const { approvalStatus } = req.body;

    if (!['approved', 'rejected'].includes(approvalStatus)) {
        return res.status(400).json({
            error: 'approvalStatus must be approved or rejected'
        });
    }

    try {
        const result = db.prepare(`
            UPDATE Seller
            SET approvalStatus = ?
            WHERE sellerID = ?
        `).run(approvalStatus, sellerID);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.json({
            message: `Seller ${approvalStatus} successfully`,
            sellerID: Number(sellerID),
            approvalStatus
        });
    } catch (error) {
        console.error('Error updating seller approval:', error);
        res.status(500).json({ error: 'Failed to update seller approval' });
    }
});

export default router;