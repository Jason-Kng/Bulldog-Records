import express from 'express';
import db from '../database/database.js';

const router = express.Router();

router.get('/', (req, res) => {

  const stmt = db.prepare("SELECT Listing.title, Listing.artist, Listing.listingID, Listing.price, Listing.photo, Listing.sellerID, User.name, Seller.accountStatus, Seller.approvalStatus FROM Listing JOIN Seller ON Listing.sellerID = Seller.sellerID JOIN User ON Seller.userID = User.userID WHERE Listing.listingStatus NOT IN ('pending', 'deactivated', 'removed') AND Seller.accountStatus = 'active' AND Seller.approvalStatus = 'approved' ORDER BY RANDOM() LIMIT 15");
  try {
    const results = stmt.all();

    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json("error: ", "Server Error");
  }
});

router.get('/details/:id', (req, res) => {
  const id = req.params;
  const stmt = db.prepare("SELECT Listing.*, User.name AS sellerName FROM Listing INNER JOIN User ON Listing.sellerID = User.userID WHERE Listing.listingID = ?");

  try {
    const results = stmt.get(id.id);
    if (!results) {
      return res.status(404).json({ error: "Listing not found" });
    }


    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json("error: ", "Server Error");
  }
});

router.get('/search', (req, res) => {
  const query = req.query.query

  const stmt = db.prepare("SELECT Listing.*, User.name FROM Listing JOIN Seller ON Listing.sellerID = Seller.sellerID JOIN User ON Seller.userID = User.userID WHERE (Listing.title LIKE ? OR Listing.artist LIKE ?) AND listingStatus NOT IN ('pending', 'deactivated', 'removed') ");

  try {
    const results = stmt.all(`%${query}%`, `%${query}`);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(500).json({ error: "Server Error" });
  }

});


export default router;
