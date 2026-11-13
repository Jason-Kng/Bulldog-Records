import express from 'express';
import db from '../database/database.js';

const router = express.Router();

router.get('/', (req, res) => {

  const stmt = db.prepare(`
        SELECT
            Listing.Title,
            Listing.Artist,
            Listing.ListingID,
            Listing.Price,
            Listing.Photo,
            Listing.SellerID,
            User.Name,
            Seller.Accountstatus,
            Seller.Approvalstatus
        FROM Listing
        JOIN Seller ON Listing.SellerID = Seller.SellerID
        JOIN User ON Seller.UserID = User.UserID
        WHERE
            Listing.Listingstatus NOT IN ('pending', 'deactivated', 'removed')
            AND Seller.Accountstatus = 'active'
            AND Seller.Approvalstatus = 'approved'
        ORDER BY RANDOM()
        LIMIT 15
        `
  );
  try {
    const results = stmt.all();

    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json("error: ", "Server Error");
  }
});

router.get('/details/:id', (req, res) => {
  const id = req.params;
  const stmt = db.prepare(`
        SELECT
            Listing.*,
            User.Name AS Sellername
        FROM Listing
        JOIN Seller ON Listing.sellerID = Seller.sellerID
        JOIN User ON Seller.userID = User.userID
        WHERE Listing.ListingID = ?
        `
  );

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

  const stmt = db.prepare(`
        SELECT
            Listing.*,
            User.Name
        FROM Listing
        JOIN Seller ON Listing.sellerID = Seller.sellerID
        JOIN User ON Seller.userID = User.userID
        WHERE
            (Listing.title LIKE ? OR Listing.artist LIKE ?)
            AND Listingstatus NOT IN ('pending', 'deactivated', 'removed')
        `
  );

  try {
    const results = stmt.all(`%${query}%`, `%${query}%`);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(500).json({ error: "Server Error" });
  }

});

router.get('/:id/suggest', (req, res) => {
  const id = req.params;
  const stmt = db.prepare(`
        SELECT
            Listing.Title,
            Listing.Artist,
            Listing.ListingID,
            Listing.Price,
            Listing.Photo,
            Listing.SellerID,
			Listing.genre,
            User.Name,
            Seller.Accountstatus,
            Seller.Approvalstatus
        FROM Listing
        JOIN Seller ON Listing.SellerID = Seller.SellerID
        JOIN User ON Seller.UserID = User.UserID
        WHERE (
            genre = (SELECT Listing.genre FROM Listing WHERE ListingID = ?)
            OR artist = (SELECT Listing.artist FROM Listing WHERE ListingID = ?)
          )
            AND Listing.Listingstatus = 'active'
            AND Seller.Accountstatus = 'active'
            AND Seller.Approvalstatus = 'approved'
			AND listingID != ?
			AND Listing.stock > 0
        `
  );

  try {
    const results = stmt.all(id.id, id.id, id.id);
    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json("error: ", "Server Error");
  }
})


export default router;
