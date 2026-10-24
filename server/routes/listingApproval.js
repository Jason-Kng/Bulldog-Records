import express from 'express';
import { requireAdmin } from './adminAuth.js';
import db from "../database/database.js"

const router = express.Router();

router.get('/listings/pending', requireAdmin, (req, res) => {
    try {
        const listings = db.prepare(`
            SELECT
                Listing.listingID,
                Listing.sellerID,
                Listing.title,
                Listing.artist,
                Listing.releaseDate,
                Listing.genre,
                Listing.condition,
                Listing.stock,
                Listing.price,
                Listing.photo,
                Listing.isVerified,
                User.name AS sellerName,
                User.email AS sellerEmail
            FROM Listing
            JOIN Seller ON Listing.sellerID = Seller.sellerID
            JOIN User ON Seller.userID = User.userID
            WHERE Listing.isVerified = 0
            ORDER BY Listing.listingID
        `).all();

        res.json(listings);
    } catch (error) {
        console.error('Error retrieving pending listings:', error);
        res.status(500).json({ error: 'Failed to retrieve pending listings' });
    }
});

router.patch('/listings/:listingID/status', requireAdmin, (req, res) => {
    const { listingID } = req.params;

    try {
        const result = db.prepare(`
            UPDATE Listing
            SET isVerified = 1
            WHERE listingID = ?
                AND isVerified = 0
        `).run(listingID);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        res.json({
            message: `Listing approved successfully`,
            listingID: Number(listingID),
            isVerified: 1
        });
    } catch (error) {
        console.error('Error approve listing:', error);
        res.status(500).json({ error: 'Failed to approve listing' });
    }
});

export default router;