import express from 'express';
import db from '../database/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const stmt = db.prepare(`SELECT Orders.*, Listing.title, Listing.artist, Listing.photo, Listing.listingID, User.name AS sellerName FROM Orders
                          JOIN Buyer ON Orders.buyerID = Buyer.buyerID
                          JOIN OrderItem ON orderItem.orderID = Orders.orderID
                          JOIN Listing ON OrderItem.listingID = Listing.listingID 
                          JOIN Seller ON Listing.sellerID = Seller.sellerID 
                          JOIN User ON Seller.userID = User.userID
                          WHERE Buyer.userID = ?`);

  try {
    const results = stmt.all(req.user.userID);
    console.log(results);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(500).json({ error: "Server Error" });
  }

});

router.get('/:id', authenticateToken, (req, res) => {
  const id = req.params;
  const stmt = db.prepare(`SELECT Orders.*, Listing.title, Listing.artist, Listing.photo, Listing.listingID, User.name AS sellerName FROM Orders
                          JOIN Buyer ON Orders.buyerID = Buyer.buyerID
                          JOIN OrderItem ON orderItem.orderID = Orders.orderID
                          JOIN Listing ON OrderItem.listingID = Listing.listingID 
                          JOIN Seller ON Listing.sellerID = Seller.sellerID 
                          JOIN User ON Seller.userID = User.userID
                          WHERE Buyer.userID = ? AND Orders.orderID = ?`);
  try {
    const results = stmt.all(req.user.userID, id.id);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(500).json({ error: "Server Error" });
  }

});

export default router;
