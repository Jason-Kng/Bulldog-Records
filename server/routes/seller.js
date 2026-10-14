const express = require("express");
const db = require("../database/database");

const router = express.Router();

// routes for seller

// get seller
// will be from api/seller (the BASE = api/seller is in api in client)
router.get("/", (req, res) => {
  const query = db.prepare("SELECT * FROM Seller WHERE sellerID = ?");
  const seller = query.get(req.sellerID);

  if (!seller) {
    return res.status(404).json({ error: "Seller not found" });
  }
  res.json(seller);
});

// create a listing
router.post("/listings", (req, res) => {
  // db fields
  const { title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, photo } = req.body;

  // check required fields are there
  if (!title || !artist || !mediaType || !genre || !condition || !price || !photo) {
    return res.status(400).json({ error: "New listing fields are missing"});
  }

  // create entry in db
  try {
    const query = db.prepare(`INSERT INTO Listing (sellerID, title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const values = query.run(req.sellerID, title, artist, releaseDate || null, mediaType, genre, EAN || null, condition, stock || 0, price, photo)
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }

  // need error handling

});


// get seller's listings
router.get("/listings", (req, res) => {
  const query = db.prepare("SELECT * FROM Listing WHERE sellerID = ? AND listingStatus != 'removed'");
  const listings = query.all(req.sellerID);

  res.json(listings);
});

// edit the fields of a listing
router.put("/listings/:id", (req, res) => {
  // db fields
  const { title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, photo } = req.body;

  // check required fields are there
  if (!title || !artist || !mediaType || !genre || !condition || !price || !photo) {
    return res.status(400).json({ error: "New listing fields are missing"});
  }

  try {
    const query = db.prepare(`UPDATE Listing SET title = ?, artist = ?, releaseDate = ?, mediaType = ?, genre = ?, EAN = ?, condition = ?, stock = ?, price = ?, photo = ? WHERE listingID = ? AND sellerID = ? AND listingStatus != 'removed'`);
    const values = query.run(req.sellerID, title, artist, releaseDate || null, mediaType, genre, EAN || null, condition, stock || 0, price, photo, req.params.id, req.sellerID)

    // would send like updated: 10, confirming update to the listing
    res.json({ updated: req.params.id });
  }
  catch (error) {
    res.status(400).json({ error: error.message});
  }

});

// remove listing, soft delete (set status to removed)
router.delete("/listings/:id", (res, req) => {
  const query = db.prepare("UPDATE Listing SET listingStatus = 'removed' WHERE listingID = ? AND sellerID = ? AND listingStatus != 'removed'");
  const remove = query.run(req.params.id, req.sellerID);

  // same as update, but for remove
  // TODO: need to add res.json to other routes that don't have them, like add/edit
  res.json({ removed: req.params.id });
})

// get one listing from seller
router.get("/listings/:id", (req, res) => {
  const query = db.prepare("SELECT * FROM Listing WHERE listingID = ? AND sellerID = ? AND listingStatus != 'removed'");
  // query.get(req.params.id) gets id from URL
  // so listingID is req.params.id and sellerID is req.sellerID
  const listing = query.get(req.params.id, req.sellerID);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found"});
  }

  res.json(listing);
});

module.exports = router;

