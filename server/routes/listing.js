import express from 'express';
import db from '../database/database.js';

const router = express.Router();

router.get('/', (req, res) => {

  const stmt = db.prepare("SELECT title, artist, listingID, price, photo, sellerID, (SELECT User.name from User WHERE userID=sellerID) AS name FROM Listing LIMIT 15");
  try {
    const results = stmt.all();
    console.log("Sending data:", results);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.json("error: ", e);
  }
});

router.get('/details/:id', (req, res) => {
  const id = req.params;
  const stmt = db.prepare("SELECT Listing.*, User.name AS sellerName FROM Listing INNER JOIN User ON Listing.sellerID = User.userID WHERE Listing.listingID = ?");

  try {
    const results = stmt.get(id.id);
    res.send(results);
  } catch (e) {
    console.log("Error: ", e);
    res.json("error: ", e);
  }
});

export default router;
