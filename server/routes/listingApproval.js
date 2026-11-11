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
                Listing.mediaType,
                Listing.isVerified,
                User.name AS sellerName,
                User.email AS sellerEmail
            FROM Listing
            JOIN Seller ON Listing.sellerID = Seller.sellerID
            JOIN User ON Seller.userID = User.userID
            WHERE Listing.listingStatus = 'pending'
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
    const { listingStatus } = req.body;

    try {
        const result = db.prepare(`
            UPDATE Listing
            SET listingStatus = ?
            WHERE listingID = ? AND listingStatus = 'pending'
        `).run(listingStatus, listingID);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        res.json({
            message: `Listing ${listingStatus} successfully`,
            listingID: Number(listingID)
        });
    } catch (error) {
        console.error('Error approve listing:', error);
        res.status(500).json({ error: 'Failed to approve listing' });
    }
});

export default router;