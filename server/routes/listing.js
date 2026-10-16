import express from 'express';
import db from '../database/database.js';

const router = express.Router();

router.get('/', (req, res) => {

  const stmt = db.prepare("SELECT title, artist, listingID, sellerID, price FROM Listing");
  try {
    const results = stmt.all();
    console.log("Sending data:", results);
    res.send(results);
  } catch (e) {
    console.log(e);
    res.json("error: ", e);
  }
});

export default router;
